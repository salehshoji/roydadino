package http

import (
	"Web_Proj/models"
	"Web_Proj/pkg/postgres"
	"Web_Proj/pkg/redis"
	"Web_Proj/repos"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
	"net/http"
	"time"
)

type Handler struct {
	UserRepo    repos.UsersRepository
	SessionRepo repos.SessionRepository
	RedisDB     *redis.Redis
	MasterPg    *postgres.PGXDatabase
	SlavePg     *postgres.PGXDatabase
}

func NewHandler(sessionRepo repos.SessionRepository, userRepo repos.UsersRepository, masterPg *postgres.PGXDatabase, slavePg *postgres.PGXDatabase, redisDB *redis.Redis) *Handler {
	return &Handler{
		SessionRepo: sessionRepo,
		UserRepo:    userRepo,
		MasterPg:    masterPg,
		SlavePg:     slavePg,
		RedisDB:     redisDB,
	}
}

func (h *Handler) Signin(c *gin.Context) {
	var req RequestSignin
	logPrefix := "http handler: Signin:"
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  err.Error(),
		})
		log.Printf(logPrefix+" ShouldBindJSON: %v", err)
		return
	}

	user, err := h.UserRepo.FindByUsername(c, req.Username)
	if err != nil {
		log.Printf(logPrefix+" FindByUsername: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "failed",
			"error":  err.Error(),
		})
		return
	}

	if user == nil {
		log.Printf(logPrefix+" UserIsNil: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  "user does not exists with this username",
		})
		return
	}

	if user.Password != req.Password {
		log.Printf(logPrefix+" Password Match: %v", err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "failed",
			"error":  "user password does not match",
		})
		return
	}

	sessionUUID := uuid.New().String()

	err = h.SessionRepo.Create(c, &models.Session{
		Username: req.Username,
		Expiry:   time.Now().Add(repos.SessionsTimeout),
	}, sessionUUID)
	if err != nil {
		log.Printf(logPrefix+" Create Session: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "failed",
			"error":  err.Error(),
		})
		return
	}

	c.SetCookie("session_token", sessionUUID, 3600, "/", "localhost", false, true)
}

func (h *Handler) Signup(c *gin.Context) {
	var req RequestSignup
	logPrefix := "http handler: Signup:"
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		log.Printf(logPrefix+" ShouldBindJSON: %v", err)
		return
	}

	user, err := h.UserRepo.FindByUsername(c, req.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "failed",
			"error":  err.Error(),
		})
		return
	}

	if user != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  "user exists with this username",
		})
		return
	}

	err = h.UserRepo.Create(c, &models.User{
		Username: req.Username,
		Password: req.Password,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "failed",
			"error":  err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "successful",
		"error":  "",
	})
}
