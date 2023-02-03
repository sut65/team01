package controller

import (
	"net/http"
	"github.com/sut65/team01/entity"
	"github.com/gin-gonic/gin"
)

func GetRole(c *gin.Context) {
	var role entity.Role
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM roles WHERE id = ?", id).Scan(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":role})
}

func ListRole(c *gin.Context) {
	var role []entity.Role
	if err := entity.DB().Raw("SELECT * FROM roles").Scan(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": role})
}