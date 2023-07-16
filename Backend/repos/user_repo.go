package repos

import (
	"Web_Proj/models"
	"Web_Proj/pkg/encryption"
	"Web_Proj/pkg/postgres"
	"context"
	"fmt"
	"github.com/jackc/pgx/v4"
)

const (
	FindByUsernameQuery = "select username, password from users where username = $1"
	CreateQuery         = "insert into users(username, password) values ($1, $2)"
)

type UsersRepository interface {
	FindByUsername(ctx context.Context, username string) (*models.User, error)
	Create(ctx context.Context, user *models.User) error
}

type UsersRepositoryImpl struct {
	masterPg  *postgres.PGXDatabase
	slavePg   *postgres.PGXDatabase
	tableName string
	secretKey string
}

func (u *UsersRepositoryImpl) FindByUsername(ctx context.Context, username string) (*models.User, error) {
	var user models.User
	err := u.slavePg.QueryRow(ctx, FindByUsernameQuery, username).Scan(&user.Username, &user.Password)
	if err == pgx.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	user.Password, err = encryption.Decrypt(user.Password, u.secretKey)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *UsersRepositoryImpl) Create(ctx context.Context, user *models.User) error {
	var err error
	user.Password, err = encryption.Encrypt(user.Password, u.secretKey)
	if err != nil {
		return err
	}
	_, err = u.masterPg.Exec(ctx, CreateQuery, user.Username, user.Password)
	return err
}

func NewUsersRepository(masterPg *postgres.PGXDatabase, slavePg *postgres.PGXDatabase, secretKey string, options ...UsersRepoOption) UsersRepository {

	pr := UsersRepositoryImpl{
		masterPg:  masterPg,
		slavePg:   slavePg,
		tableName: "users",
		secretKey: secretKey,
	}

	for _, option := range options {
		pr = option(pr)
	}

	return &pr
}

type UsersRepoOption func(UsersRepositoryImpl) UsersRepositoryImpl

func UsersRepoOptionWithTableName(tableName string) UsersRepoOption {
	return func(repo UsersRepositoryImpl) UsersRepositoryImpl {
		if tableName == "" {
			return repo
		}
		repo.tableName = tableName
		return repo
	}
}

func UsersRepoOptionWithAutoCreate() UsersRepoOption {
	return func(repo UsersRepositoryImpl) UsersRepositoryImpl {
		scheme := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s ( 
			username varchar(30) not null,
			password varchar(30) not null,
			created_at timestamp not null default now()
		);`, repo.tableName)
		_, err := repo.masterPg.Exec(context.Background(), scheme)
		if err != nil {
			panic("create users table failed")
		}
		return repo
	}
}
