package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
	"golang.org/x/crypto/bcrypt"
)

func CreateEmployee(c *gin.Context) {
	var employee entity.Employee
	var admin entity.Admin
	var title entity.Title
	var role entity.Role
	var gender entity.Gender

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", employee.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	// 11: ค้นหา title ด้วย id
	if tx := entity.DB().Where("id = ?", employee.TitleID).First(&title); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title not found"})
		return
	}

	// 12: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	// 13: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}
	bytes, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	employee.Password = string(bytes)
	// 14: สร้าง Employee
	WV := entity.Employee{
		Admin:       admin,
		IDCard:      employee.IDCard,    // ตั้งค่าฟิลด์ IDCard
		Title:       title,              // โยงความสัมพันธ์กับ Entity Title
		FirstName:   employee.FirstName, // ตั้งค่าฟิลด์ Name
		LastName:    employee.LastName,
		Role:        role,                 // โยงความสัมพันธ์กับ Entity Position
		PhoneNumber: employee.PhoneNumber, // ตั้งค่าฟิลด์ PhoneNumber
		Email:       employee.Email,       /// ตั้งค่าฟิลด์ Email
		Password:    employee.Password,    // ตั้งค่าฟิลด์ Password
		Gender:      gender,               // โยงความสัมพันธ์กับ Entity Gender
		Salary:      employee.Salary,      // ตั้งค่าฟิลด์ Salary
		Birthday:    employee.Birthday,    // ตั้งค่าฟิลด์ BirthDay
	}

	//ขั้นตอนการ validate ที่นำมาจาก  unit test
	if _, err := govalidator.ValidateStruct(WV); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
	if err := entity.DB().Create(&WV).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": WV})
}

// GET /employees
func ListEmployee(c *gin.Context) {
	var employee []entity.Employee
	if err := entity.DB().Preload("Admin").
		Preload("Title").
		Preload("Role").
		Preload("Gender").
		Raw("SELECT * FROM employees").Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET: /employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if err := entity.DB().
		Preload("Admin").
		Preload("Title").
		Preload("Role").
		Preload("Gender").
		Raw("SELECT * FROM employees WHERE id = ?", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /Employeerole/:roleid
// Get Employeerole by roleid
func GetEmployeerole(c *gin.Context) {
	var employee []entity.Employee
	roleid := c.Param("roleid")
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM employees WHERE role_id = ?", roleid).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// DELETE /employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	// var employee entity.Employee
	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /employees
func UpdateEmployee(c *gin.Context) {
	var payload entity.Employee
	var employee entity.Employee
	var admin entity.Admin
	var title entity.Title
	var role entity.Role
	var gender entity.Gender

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	// 11: ค้นหา title ด้วย id
	if tx := entity.DB().Where("id = ?", payload.TitleID).First(&title); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title not found"})
		return
	}

	// 12: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", payload.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	// 13: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", payload.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	updateEmployee := entity.Employee{
		Admin:       admin,
		IDCard:      payload.IDCard,    // ตั้งค่าฟิลด์ IDCard
		Title:       title,             // โยงความสัมพันธ์กับ Entity Title
		FirstName:   payload.FirstName, // ตั้งค่าฟิลด์ Name
		LastName:    payload.LastName,
		Role:        role,                // โยงความสัมพันธ์กับ Entity Position
		PhoneNumber: payload.PhoneNumber, // ตั้งค่าฟิลด์ PhoneNumber
		Email:       payload.Email,       /// ตั้งค่าฟิลด์ Email
		Password:    payload.Password,    // ตั้งค่าฟิลด์ Password
		Gender:      gender,              // โยงความสัมพันธ์กับ Entity Gender
		Salary:      payload.Salary,      // ตั้งค่าฟิลด์ Salary
		Birthday:    payload.Birthday,    // ตั้งค่าฟิลด์ BirthDay
	}

	if _, err := govalidator.ValidateStruct(updateEmployee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", employee.ID).Updates(&updateEmployee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": employee})
}
