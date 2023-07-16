package models

import "time"

type User struct {
	Username string
	Password string
}

type Session struct {
	Username string
	Expiry   time.Time
}
