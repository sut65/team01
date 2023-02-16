package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST	/statusmeds
func CreateStatusMed(c *gin.Context) {
	var statusmed entity.StatusMed
	if err := c.ShouldBindJSON(&statusmed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&statusmed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusmed})
}

// GET /statusmed/:id
func GetStatusMed(c *gin.Context) {
	var statusmed entity.StatusMed
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM status_meds WHERE id = ?", id).Scan(&statusmed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusmed})
}

// GET /statusmeds
func ListStatusMeds(c *gin.Context) {
	var statusmeds []entity.StatusMed
	if err := entity.DB().Raw("SELECT * FROM status_meds").Scan(&statusmeds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusmeds})
}

// DELETE /statusmeds/:id
func DeleteStatusMed(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM status_meds WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusmed not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /statusmeds
func UpdateStatusMed(c *gin.Context) {
	var statusmed entity.StatusMed
	if err := c.ShouldBindJSON(&statusmed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", statusmed.ID).First(&statusmed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusmed not found"})
		return
	}

	if err := entity.DB().Save(&statusmed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusmed})
}
