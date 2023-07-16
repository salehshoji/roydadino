package http

type RequestSignin struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RequestSignup struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
