package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST	/roles
func CreateRole(c *gin.Context) {
	var role entity.Role
	if err := c.ShouldBindJSON(&role); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": role})
}

// GET /role/:id
func GetRole(c *gin.Context) {
	var role entity.Role
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM roles WHERE id = ?", id).Scan(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": role})
}

// GET /roles
func ListRole(c *gin.Context) {
	var role []entity.Role
	if err := entity.DB().Raw("SELECT * FROM roles").Scan(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": role})
}

// DELETE /roles/:id
func DeleteRole(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM roles WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /roles
func UpdateRole(c *gin.Context) {
	var role entity.Role
	if err := c.ShouldBindJSON(&role); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", role.ID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}

	if err := entity.DB().Save(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": role})
}
