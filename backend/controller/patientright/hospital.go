package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// GET  hospital/:id
func GetHospital(c *gin.Context) {
	var hospital entity.Hospital
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM hospitals WHERE id = ?", id).Scan(&hospital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": hospital})
}

// GET All /hospitals
func ListHospital(c *gin.Context) {
	var hospitals []entity.Hospital
	if err := entity.DB().Raw("SELECT * FROM hospitals").Scan(&hospitals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": hospitals})
}