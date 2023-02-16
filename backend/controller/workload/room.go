package controller

// import (
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// 	"github.com/sut65/team01/entity"
// )

// // POST /rooms
// func CreateRoom(c *gin.Context) {
// 	var room entity.Room

// 	if err := c.ShouldBindJSON(&room); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&room).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": room})
// }

// // GET /room/:id
// func GetRoom(c *gin.Context) {
// 	var room entity.Room
// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM rooms WHERE id = ?", id).Scan(&room).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": room})
// }

// // GET /rooms
// func ListRoom(c *gin.Context) {
// 	var room []entity.Room
// 	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&room).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": room})
// }

// // DELETE /rooms/:id
// func DeleteRoom(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM rooms WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /rooms
// func UpdateRoom(c *gin.Context) {
// 	var room entity.Room
// 	if err := c.ShouldBindJSON(&room); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", room.ID).First(&room); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&room).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": room})
// }
