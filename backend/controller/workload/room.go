package controller

// import (
// 	"net/http"
// 	"github.com/sut65/team01/entity"
// 	"github.com/gin-gonic/gin"
// )

// func GetRoom(c *gin.Context) {
// 	var room entity.Room
// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM rooms WHERE id = ?", id).Scan(&room).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data":room})
// }

// func ListRoom(c *gin.Context) {
// 	var room []entity.Room
// 	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&room).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": room})
// }
