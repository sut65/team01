package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team01/entity"
)

// POST /appointments
func CreateAppointmet(c *gin.Context) {

	var appointment entity.Appointment
	var patientregister entity.PatientRegister
	var room entity.Room
	var employee entity.Employee

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร appointment
	if err := c.ShouldBindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 9: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.PatientRegisterID).First(&patientregister); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	// 10: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}

	// 11: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}
	// 12: สร้าง Appointment
	apm := entity.Appointment{
		PatientRegister: patientregister, // โยงความสัมพันธ์กับ Entity Patient
		Employee:        employee,        // โยงความสัมพันธ์กับ Entity Employee
		Room:            room,            // โยงความสัมพันธ์กับ Entity Clinic
		// RoomNumber:      appointment.RoomNumber,      // ตั้งค่าฟิลด์ roomnumber
		AppointmentTime: appointment.AppointmentTime, // ตั้งค่าฟิลด์ appointmentTime
		Note:            appointment.Note,            // ตั้งค่าฟิลด์ note
	}

	//ขั้นตอนการ validate ที่นำมาจาก  unit test
	if _, err := govalidator.ValidateStruct(apm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&apm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": apm})
}

// GET /appointment/:id
func GetAppointment(c *gin.Context) {
	var appointment entity.Appointment
	id := c.Param("id")
	if err := entity.DB().Preload("Patient").Preload("Employee").Preload("Clinic").Raw("SELECT * FROM appointments WHERE id = ?", id).Find(&appointment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appointment})
}

// GET /appointments
func ListAppointments(c *gin.Context) {
	var appointments []entity.Appointment
	if err := entity.DB().
		Preload("PatientRegister").
		Preload("PatientRegister.PatientRegisterGender").
		Preload("Employee").
		Preload("Room").
		Raw("SELECT * FROM appointments").Find(&appointments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": appointments})
}

// DELETE /appointments/:id
func DeleteAppointment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM appointments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "appointment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /appointments
func UpdateAppointment(c *gin.Context) {
	var updateappointment entity.Appointment
	var appointment entity.Appointment
	var patientregister entity.PatientRegister
	var room entity.Room
	var employee entity.Employee
	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร appointment
	if err := c.ShouldBindJSON(&updateappointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 9: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", updateappointment.PatientRegisterID).First(&patientregister); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	// 10: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", updateappointment.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}

	// 11: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", updateappointment.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}
	// 12: สร้าง Appointment
	upapm := entity.Appointment{
		PatientRegister: patientregister, // โยงความสัมพันธ์กับ Entity Patient
		Employee:        employee,        // โยงความสัมพันธ์กับ Entity Employee
		Room:            room,            // โยงความสัมพันธ์กับ Entity Clinic
		// RoomNumber:      updateappointment.RoomNumber,      // ตั้งค่าฟิลด์ roomnumber
		AppointmentTime: updateappointment.AppointmentTime, // ตั้งค่าฟิลด์ appointmentTime
		Note:            updateappointment.Note,            // ตั้งค่าฟิลด์ note
	}

	//ขั้นตอนการ validate ที่นำมาจาก  unit testing
	if _, err := govalidator.ValidateStruct(upapm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", appointment.ID).Updates(&upapm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Save(&historysheet).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	c.JSON(http.StatusOK, gin.H{"status": "Updating Success!", "data": appointment})
}
