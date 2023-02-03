package controller

import (
	"github.com/sut65/team01/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"golang.org/x/crypto/bcrypt"
)

// GET /admin/:id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM admins WHERE id = ?", id).Find(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admin})
}

func ListAdmin(c *gin.Context) {
	var admin []entity.Admin
	if err := entity.DB().Raw("SELECT * FROM admins").Find(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admin})
}

func CreateAdmin(c *gin.Context) {
	var admin entity.Admin
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(admin.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	admin.Password = string(bytes)

	if err := entity.DB().Create(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admin})
}
