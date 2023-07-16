package postgres

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
	"os"
)

type PGXDatabase struct {
	*pgxpool.Pool
}

type Option struct {
	Host string
	Port int
	User string
	Pass string
	Db   string
}

func NewPGXPostgres(option Option, maxConnections int) *PGXDatabase {
	var err error

	if maxConnections == 0 {
		maxConnections = 5
	}

	config, _ := pgxpool.ParseConfig("")
	config.ConnConfig.Host = option.Host
	config.ConnConfig.Port = uint16(option.Port)
	config.ConnConfig.Database = option.Db
	config.ConnConfig.User = option.User
	config.ConnConfig.Password = option.Pass
	config.MaxConns = int32(maxConnections)

	log.Printf("Creating pgx connection pool. host: %v, port: %v", option.Host, option.Port)
	postgresPool, err := pgxpool.ConnectConfig(context.Background(), config)
	if err != nil {
		log.Printf("Unable to create connection pool. host: %v, error: %v", option.Host, err)
		os.Exit(1)
	}
	log.Printf("Pgx connection pool created successfully.")

	return &PGXDatabase{postgresPool}
}
