package controller

import (
	"net/http"

	"github.com/Siriwan38/se-65/entity"
	"github.com/gin-gonic/gin"
)

// GET /:id
func GetStatusMed(c *gin.Context) {
	var statusmed entity.StatusMed
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM status_meds WHERE id = ?", id).Scan(&statusmed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusmed})
}

// GET
func ListStatusMeds(c *gin.Context) {
	var statusmeds []entity.StatusMed
	if err := entity.DB().Raw("SELECT * FROM status_meds").Scan(&statusmeds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusmeds})
}
