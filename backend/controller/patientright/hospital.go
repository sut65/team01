package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /hospitals
func CreateHospital(c *gin.Context) {
	var hospital entity.Hospital
	if err := c.ShouldBindJSON(&hospital); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&hospital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": hospital})
}

// GET  /hospital/:id
func GetHospital(c *gin.Context) {
	var hospital entity.Hospital
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM hospitals WHERE id = ?", id).Scan(&hospital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": hospital})
}

// GET /hospitals
func ListHospital(c *gin.Context) {
	var hospitals []entity.Hospital
	if err := entity.DB().Raw("SELECT * FROM hospitals").Scan(&hospitals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": hospitals})
}

// DELETE /hospitals/:id
func DeleteHospital(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM hospitals WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hospital level not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /hospitals
func UpdateHospital(c *gin.Context) {
	var hospital entity.Hospital
	if err := c.ShouldBindJSON(&hospital); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", hospital.ID).First(&hospital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hospital not found"})
		return
	}

	if err := entity.DB().Save(&hospital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": hospital})
}
