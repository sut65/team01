package controller

import (
	"github.com/sut65/team01/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

// GET /admin/:id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id") //ค้นหา id ใน parameter ที่ตรงกับ id ที่ต้องการดึง
	if err := entity.DB().Table("admins").Where("id = ?",id).Find(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

func ListAdmin(c *gin.Context){
	var Admin []entity.Admin
	if err := entity.DB().Table("admins").Find(&Admin).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK,gin.H{"data": Admin})
}
