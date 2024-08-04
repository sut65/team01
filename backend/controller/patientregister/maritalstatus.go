package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /maritalstatuses
func CreateMaritalStatus(c *gin.Context) {
	var maritalstatus entity.MaritalStatus
	if err := c.ShouldBindJSON(&maritalstatus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&maritalstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": maritalstatus})
}

// GET /maritalstatus/:id
func GetMaritalStatus(c *gin.Context) {
	var maritalstatus entity.MaritalStatus
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM marital_statuses WHERE id = ?", id).Scan(&maritalstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": maritalstatus})
}

// GET /maritalstatuses
func ListMaritalStatuses(c *gin.Context) {
	var maritalstatuses []entity.MaritalStatus
	if err := entity.DB().Raw("SELECT * FROM marital_statuses").Scan(&maritalstatuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": maritalstatuses})
}

// DELETE /maritalstatuses/:id
func DeleteMaritalStautus(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM marital_statuses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "maritalstatus not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /maritalstatuses
func UpdateMaritalStatus(c *gin.Context) {
	var maritalstatus entity.MaritalStatus
	if err := c.ShouldBindJSON(&maritalstatus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", maritalstatus.ID).First(&maritalstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "maritalstatus not found"})
		return
	}
	if err := entity.DB().Save(&maritalstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": maritalstatus})
}
