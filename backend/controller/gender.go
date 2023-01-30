package controller

import (
	"github.com/sut65/team01/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ListGender(c *gin.Context){
	var Gender []entity.Gender
	if err := entity.DB().Table("genders").Find(&Gender).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK,gin.H{"data": Gender})
}
