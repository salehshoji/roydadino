package main

import (
	"Web_Proj/api/http"
	"Web_Proj/config"
	"Web_Proj/pkg/postgres"
	"Web_Proj/pkg/redis"
	"Web_Proj/repos"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	RedisDB     *redis.Redis
	MasterPg    *postgres.PGXDatabase
	SlavePg     *postgres.PGXDatabase
	UserRepo    repos.UsersRepository
	SessionRepo repos.SessionRepository
	httpHandler *http.Handler
}

func main() {
	conf := config.New()
	handler := Handler{}
	handler.RedisDB = redis.NewRedisWithOption(redis.Option{
		Host:       conf.Redis.Host,
		Port:       conf.Redis.Port,
		PoolSize:   conf.Redis.PoolSize,
		DB:         conf.Redis.DB,
		Pass:       conf.Redis.Pass,
		MaxRetries: conf.Redis.MaxRetries,
	})
	handler.MasterPg = postgres.NewPGXPostgres(postgres.Option{
		Host: conf.MasterPg.Host,
		Port: conf.MasterPg.Port,
		User: conf.MasterPg.User,
		Pass: conf.MasterPg.Pass,
		Db:   conf.MasterPg.DB,
	}, conf.MasterPg.MaxConnections)

	handler.SlavePg = postgres.NewPGXPostgres(postgres.Option{
		Host: conf.SlavePg.Host,
		Port: conf.SlavePg.Port,
		User: conf.SlavePg.User,
		Pass: conf.SlavePg.Pass,
		Db:   conf.SlavePg.DB,
	}, conf.SlavePg.MaxConnections)

	handler.UserRepo = repos.NewUsersRepository(handler.MasterPg, handler.SlavePg, conf.SecretKey, repos.UsersRepoOptionWithTableName("users"), repos.UsersRepoOptionWithAutoCreate())
	handler.SessionRepo = repos.NewSessionRepository(handler.RedisDB)
	handler.httpHandler = http.NewHandler(handler.SessionRepo, handler.UserRepo, handler.MasterPg, handler.SlavePg, handler.RedisDB)

	route := gin.Default()
	route.POST("/signin", handler.httpHandler.Signin)
	route.POST("/signup", handler.httpHandler.Signup)

	err := route.Run(":8000")
	if err != nil {
		return
	}

}
