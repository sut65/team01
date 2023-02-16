package controller

// import (
// 	"net/http"

// 	"github.com/sut65/team01/entity"
// 	//"github.com/ChatreeDev/sa-65-example/entity"
// 	"github.com/gin-gonic/gin"
// )

// // POST /obesitylevels
// func CreateObesityLevel(c *gin.Context) {
// 	var ObesityLevel entity.ObesityLevel
// 	if err := c.ShouldBindJSON(&ObesityLevel); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&ObesityLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": ObesityLevel})
// }

// // GET /obesitylevel/:id
// func GetObesityLevel(c *gin.Context) {
// 	var ObesityLevel entity.ObesityLevel

// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM obesity_levels WHERE id = ?", id).Find(&ObesityLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": ObesityLevel})
// }

// // GET /obesitylevels
// func ListObesityLevels(c *gin.Context) {
// 	var ObesityLevels []entity.ObesityLevel //[] ส่งเป็นแบบลิสต์

// 	if err := entity.DB().Raw("SELECT * FROM obesity_levels").Scan(&ObesityLevels).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": ObesityLevels})
// }

// // DELETE /obesitylevels/:id
// func DeleteObesityLevel(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM obesity_levels WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "obesity level not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /obesitylevels
// func UpdateObesityLevel(c *gin.Context) {
// 	var ObesityLevel entity.ObesityLevel
// 	if err := c.ShouldBindJSON(&ObesityLevel); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", ObesityLevel.ID).First(&ObesityLevel); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "obesity level not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&ObesityLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": ObesityLevel})
// }

// /* Note.
// 1. ObesityLevel เป็นตารางรอง ไม่จำเป็นต้องมี preload เพราะไม่ต้องไปดึงของใครมาใส่ของตัวเอง
// 2.
// */
