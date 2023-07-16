package redis

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
)

type Redis struct {
	*redis.Client
	Ring *redis.Ring
}

type FailoverClient struct {
	Master *redis.Client
	Slave  *redis.Client
}

type Option struct {
	Host       string
	Port       string
	PoolSize   int
	DB         int
	Pass       string
	MaxRetries int
}

func NewRedisWithOption(option Option) *Redis {
	var redisClient *redis.Client

	redisClient = redis.NewClient(&redis.Options{
		Addr:       option.Host + ":" + option.Port,
		MaxRetries: option.MaxRetries,
		PoolSize:   option.PoolSize,
		Password:   option.Pass,
		DB:         option.DB,
	})

	pong, err := redisClient.Ping(context.TODO()).Result()
	if err != nil {
		panic("Failed to create redis client: " + err.Error())
	}

	fmt.Println("Pong is here:", pong)

	return &Redis{
		redisClient,
		nil,
	}
}
