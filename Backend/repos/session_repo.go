package repos

import (
	"Web_Proj/models"
	"Web_Proj/pkg/redis"
	"context"
	"encoding/json"
	goredis "github.com/go-redis/redis/v8"
	"time"
)

const SessionsTimeout = time.Minute * 60

type SessionRepository interface {
	Create(ctx context.Context, session *models.Session, uuid string) error
	FindByUUID(ctx context.Context, uuid string) (*models.Session, error)
}

func (s *SessionRepositoryImpl) Create(ctx context.Context, session *models.Session, uuid string) error {
	data, err := json.Marshal(session)
	if err != nil {
		return err
	}
	_, err = s.redisDB.Set(ctx, s.getKey(uuid), string(data), SessionsTimeout).Result()
	return err
}

func (s *SessionRepositoryImpl) FindByUUID(ctx context.Context, uuid string) (*models.Session, error) {
	data, err := s.redisDB.Get(ctx, s.getKey(uuid)).Result()
	if err == goredis.Nil {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	var session models.Session
	err = json.Unmarshal([]byte(data), &session)
	return &session, nil
}

func NewSessionRepository(redisDB *redis.Redis) SessionRepository {

	pr := SessionRepositoryImpl{
		redisDB: redisDB,
		key:     "sessions-",
	}

	return &pr
}

type SessionRepositoryImpl struct {
	redisDB *redis.Redis
	key     string
}

func (s *SessionRepositoryImpl) getKey(uuid string) string {
	return s.key + uuid
}
