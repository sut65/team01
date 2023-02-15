package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// GET /PatientType/:id
func GetRightType(c *gin.Context) {
	var righttype entity.RightType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM right_types WHERE id = ?", id).Scan(&righttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": righttype})
}

// GET All /PatientTypes
func ListPatientType(c *gin.Context) {
	var righttypes []entity.RightType
	if err := entity.DB().Raw("SELECT * FROM right_types ").Scan(&righttypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": righttypes})
}
