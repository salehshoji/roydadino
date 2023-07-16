package main

import (
	"Web_Proj/api/http"
	"Web_Proj/pkg/postgres"
	"Web_Proj/pkg/redis"
	"Web_Proj/repos"
	"github.com/gin-gonic/gin"
)

const Secret = "THIS IS SECRET 1" // TODO: use sealed secret

type Handler struct {
	RedisDB     *redis.Redis
	MasterPg    *postgres.PGXDatabase
	SlavePg     *postgres.PGXDatabase
	UserRepo    repos.UsersRepository
	SessionRepo repos.SessionRepository
	httpHandler *http.Handler
}

func main() {
	handler := Handler{}
	handler.RedisDB = redis.NewRedisWithOption(redis.Option{
		Host:       "localhost",
		Port:       "6379",
		PoolSize:   10,
		DB:         0,
		Pass:       "",
		MaxRetries: 1,
	})
	handler.MasterPg = postgres.NewPGXPostgres(postgres.Option{
		Host: "localhost",
		Port: 5432,
		User: "postgres",
		Pass: "postgres",
		Db:   "najva",
	}, 1000)
	handler.SlavePg = postgres.NewPGXPostgres(postgres.Option{
		Host: "localhost",
		Port: 5432,
		User: "postgres",
		Pass: "postgres",
		Db:   "najva",
	}, 1000)

	handler.UserRepo = repos.NewUsersRepository(handler.MasterPg, handler.SlavePg, Secret, repos.UsersRepoOptionWithTableName("users"), repos.UsersRepoOptionWithAutoCreate())
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
