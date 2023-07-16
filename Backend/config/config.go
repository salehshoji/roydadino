package config

type RedisSection struct {
	Host       string
	Port       string
	PoolSize   int
	DB         int
	Pass       string
	MaxRetries int
}

type PgSection struct {
	Host           string
	Port           int
	User           string
	Pass           string
	DB             string
	MaxConnections int
}

type Config struct {
	Redis     RedisSection
	MasterPg  PgSection
	SlavePg   PgSection
	SecretKey string
}

func New() *Config {
	conf := &Config{
		SecretKey: "THIS IS SECRET 1",
		Redis: RedisSection{
			Host:       "localhost",
			Port:       "6379",
			PoolSize:   10,
			DB:         0,
			Pass:       "",
			MaxRetries: 10,
		},
		MasterPg: PgSection{
			Host:           "localhost",
			Port:           5432,
			User:           "postgres",
			Pass:           "postgres",
			DB:             "najva",
			MaxConnections: 500,
		},
		SlavePg: PgSection{
			Host:           "localhost",
			Port:           5432,
			User:           "postgres",
			Pass:           "postgres",
			DB:             "najva",
			MaxConnections: 500,
		},
	}
	return conf
}
