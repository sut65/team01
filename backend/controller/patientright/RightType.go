package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /patienttypes
func CreateRightType(c *gin.Context) {
	var righttype entity.RightType
	if err := c.ShouldBindJSON(&righttype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&righttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": righttype})
}

// GET /patienttype/:id
func GetRightType(c *gin.Context) {
	var righttype entity.RightType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM right_types WHERE id = ?", id).Scan(&righttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": righttype})
}

// GET /patienttypes
func ListPatientType(c *gin.Context) {
	var righttypes []entity.RightType
	if err := entity.DB().Raw("SELECT * FROM right_types ").Scan(&righttypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": righttypes})
}

// DELETE /patienttypes/:id
func DeletePatientType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM right_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "righttype level not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /patienttypes
func UpdatePatientType(c *gin.Context) {
	var righttype entity.RightType
	if err := c.ShouldBindJSON(&righttype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", righttype.ID).First(&righttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hospital not found"})
		return
	}

	if err := entity.DB().Save(&righttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": righttype})
}
