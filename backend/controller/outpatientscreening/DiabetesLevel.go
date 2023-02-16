package controller

// import (
// 	"net/http"

// 	"github.com/sut65/team01/entity"
// 	//"github.com/ChatreeDev/sa-65-example/entity"
// 	"github.com/gin-gonic/gin"
// )

// // POST /diabeteslevels
// func CreateDiabetesLevel(c *gin.Context) {
// 	var diabetesLevel entity.DiabetesLevel
// 	if err := c.ShouldBindJSON(&diabetesLevel); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&diabetesLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": diabetesLevel})
// }

// // GET /diabeteslevel/:id
// func GetDiabetesLevel(c *gin.Context) {
// 	var diabetesLevel entity.DiabetesLevel

// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM diabetes_levels WHERE id = ?", id).Find(&diabetesLevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": diabetesLevel})
// }

// // GET /diabeteslevels
// func ListDiabetesLevel(c *gin.Context) {
// 	var diabetesLevels []entity.DiabetesLevel //[] ส่งเป็นแบบลิสต์

// 	if err := entity.DB().Raw("SELECT * FROM diabetes_levels").Scan(&diabetesLevels).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": diabetesLevels})
// }

// // DELETE /diabeteslevels/:id
// func DeleteDiabetesLevel(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM diabetes_levels WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "diabeteslevel not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /diabeteslevels
// func UpdateDiabetesLevel(c *gin.Context) {
// 	var diabeteslevel entity.DiabetesLevel
// 	if err := c.ShouldBindJSON(&diabeteslevel); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", diabeteslevel.ID).First(&diabeteslevel); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "diabeteslevel not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&diabeteslevel).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": diabeteslevel})
// }
