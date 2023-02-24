package main

import (
	"github.com/gin-gonic/gin"
	controller_appointment "github.com/sut65/team01/controller/appointment"
	controller_diagnosisrecord "github.com/sut65/team01/controller/diagnosisrecord"
	controller_employee "github.com/sut65/team01/controller/employee"
	controller_historysheet "github.com/sut65/team01/controller/historysheet"
	controller_medicinerecord "github.com/sut65/team01/controller/medicinerecord"
	controller_outpatientscreening "github.com/sut65/team01/controller/outpatientscreening"
	controller_patientregister "github.com/sut65/team01/controller/patientregister"
	controller_patientright "github.com/sut65/team01/controller/patientright"
	controller_payment "github.com/sut65/team01/controller/payment"
	controller_queuingmanagement "github.com/sut65/team01/controller/queuingmanagements"
	controller_treatmentrecord "github.com/sut65/team01/controller/treatmentrecord"
	controller_workload "github.com/sut65/team01/controller/workload"
	"github.com/sut65/team01/entity"
	"github.com/sut65/team01/middlewares"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		// check token ที่ได้มาจากหน้าบ้าน
		// ข้อมูลถูกต้อง จะเข้าถึง path ที่อยู่ในตัวแปร prptected ได้
		protected := api.Use(middlewares.Authorizes())
		{
			// Employee Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/employees", controller_employee.ListEmployee)
			protected.GET("/employee/:id", controller_employee.GetEmployee)
			protected.GET("/employeerole/:roleid", controller_employee.GetEmployeerole)
			protected.POST("/employee", controller_employee.CreateEmployee)
			protected.PATCH("/employee", controller_employee.UpdateEmployee)
			protected.DELETE("/employees/:id", controller_employee.DeleteEmployee)
			// Admin Routes
			protected.GET("/admin/:id", controller_employee.GetAdmin) //ดึง Admin ด้วย id
			protected.GET("/admins", controller_employee.ListAdmin)   //ดึง Admin
			//Title Routes
			protected.GET("/title/:id", controller_employee.GetTitle)
			protected.GET("/titles", controller_employee.ListTitle) //ดึง Title
			//Role Routes
			protected.GET("/role/:id", controller_employee.GetRole)
			protected.GET("/roles", controller_employee.ListRole) //ดึง Role
			//Gender Routes
			protected.GET("/gender/:id", controller_employee.GetGender)
			protected.GET("/genders", controller_employee.ListGender) //ดึง Gender

			// PatientRegister Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/patientregisters", controller_patientregister.ListPatientRegisters)
			protected.GET("/patientregister/:id", controller_patientregister.GetPatientRegister)
			protected.POST("/patientregisters", controller_patientregister.CreatePatientRegister)
			protected.PATCH("/patientregisters", controller_patientregister.UpdatePatientRegister)
			protected.DELETE("/patientregisters/:id", controller_patientregister.DeletePatientRegister)

			// PatientRegisterGender Routes
			protected.GET("/patientregister/genders", controller_patientregister.ListGenders)
			protected.GET("/patientregister/gender/:id", controller_patientregister.GetGender)
			protected.POST("/patientregister/genders", controller_patientregister.CreateGender)
			protected.PATCH("/patientregister/genders", controller_patientregister.UpdateGender)
			protected.DELETE("/patientregister/genders/:id", controller_patientregister.DeleteGender)

			// Prefix Routes
			protected.GET("/prefixes", controller_patientregister.ListPrefixes)
			protected.GET("/prefix/:id", controller_patientregister.GetPrefix)
			protected.POST("/prefixes", controller_patientregister.CreatePrefix)
			protected.PATCH("/prefixes", controller_patientregister.UpdatePrefix)
			protected.DELETE("/prefixes/:id", controller_patientregister.DeletePrefix)

			// Nationality Routes
			protected.GET("/nationalities", controller_patientregister.ListNationalities)
			protected.GET("/nationality/:id", controller_patientregister.GetNationality)
			protected.POST("/nationalities", controller_patientregister.CreateNationality)
			protected.PATCH("/nationalities", controller_patientregister.UpdateNationality)
			protected.DELETE("/nationalities/:id", controller_patientregister.DeleteNationality)

			// Religion Routes
			protected.GET("/religions", controller_patientregister.ListReligions)
			protected.GET("/religion/:id", controller_patientregister.GetReligion)
			protected.POST("/religions", controller_patientregister.CreateReligion)
			protected.PATCH("/religions", controller_patientregister.UpdateReligion)
			protected.DELETE("/religions/:id", controller_patientregister.DeleteReligion)

			// BloodType Routes
			protected.GET("/bloodtypes", controller_patientregister.ListBloodTypes)
			protected.GET("/bloodtype/:id", controller_patientregister.GetBloodType)
			protected.POST("/bloodtypes", controller_patientregister.CreateBloodType)
			protected.PATCH("/bloodtypes", controller_patientregister.UpdateBloodType)
			protected.DELETE("/bloodtypes/:id", controller_patientregister.DeleteBloodType)

			// MaritalStatus Routes
			protected.GET("/maritalstatuses", controller_patientregister.ListMaritalStatuses)
			protected.GET("/maritalstatus/:id", controller_patientregister.GetMaritalStatus)
			protected.POST("/maritalstatuses", controller_patientregister.CreateMaritalStatus)
			protected.PATCH("/maritalststuses", controller_patientregister.UpdateMaritalStatus)
			protected.DELETE("/maritalstatuses/:id", controller_patientregister.DeleteMaritalStautus)

			// SubDistrict Routes
			protected.GET("/subdistricts", controller_patientregister.ListSubDistricts)
			protected.GET("/subdistrict/:id", controller_patientregister.GetSubDistrict)
			protected.POST("/subdistricts", controller_patientregister.CreateSubDistrict)
			protected.PATCH("/subdistricts", controller_patientregister.UpdateSubDistrict)
			protected.DELETE("/subdistricts/:id", controller_patientregister.DeleteSubDistrict)

			protected.GET("/subdistricts/districts/:id", controller_patientregister.ListSubDistrictsByDistricts)

			// District Routes
			protected.GET("/districts", controller_patientregister.ListDistricts)
			protected.GET("/district/:id", controller_patientregister.GetDistrict)
			protected.POST("/districts", controller_patientregister.CreateDistrict)
			protected.PATCH("/districts", controller_patientregister.UpdateDistrict)
			protected.DELETE("/districts/:id", controller_patientregister.DeleteDistrict)

			// protected.GET("/districtsByprovinces/:id", controller.ListDistrictsByProvinces)
			protected.GET("/districts/provinces/:id", controller_patientregister.ListDistrictsByProvinces)

			// Province Routes
			protected.GET("/provinces", controller_patientregister.ListProvinces)
			protected.GET("/province/:id", controller_patientregister.GetProvince)
			protected.POST("/provinces", controller_patientregister.CreateProvince)
			protected.PATCH("/provinces", controller_patientregister.UpdateProvince)
			protected.DELETE("/provinces/:id", controller_patientregister.DeleteProvince)

			// DrugAllergy Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/drugallergies", controller_historysheet.ListDrugAllergies)
			protected.GET("/urgency/:id", controller_historysheet.GetDrugAllergy)
			protected.POST("/drugallergies", controller_historysheet.CreateDrugAllergy)
			protected.PATCH("/drugallergies", controller_historysheet.UpdateDrugAllergy)
			protected.DELETE("/drugallergies/:id", controller_historysheet.DeleteDrugAllergy)

			// HistorySheet Routes
			protected.GET("/historysheets", controller_historysheet.ListHistorySheets)
			protected.GET("/historysheet/:id", controller_historysheet.GetHistorySheet)
			protected.POST("/historysheets", controller_historysheet.CreateHistorySheet)
			protected.PATCH("/historysheets", controller_historysheet.UpdateHistorySheet)
			protected.DELETE("/historysheets/:id", controller_historysheet.DeleteHistorySheet)

			// OutPatientScreening Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/outpatientscreenings", controller_outpatientscreening.ListOutpatientScreenings)
			protected.GET("/outpatientscreening/:id", controller_outpatientscreening.GetOutpatientScreening)
			protected.POST("/outpatientscreenings", controller_outpatientscreening.CreateOutpatientScreenings)
			protected.PATCH("/outpatientscreenings", controller_outpatientscreening.UpdateOutpatientScreening)
			protected.DELETE("/outpatientscreenings/:id", controller_outpatientscreening.DeleteOutpatientScreening)

			// DiabetesLevel Routes
			protected.GET("/diabeteslevels", controller_outpatientscreening.ListDiabetesLevel)
			protected.GET("/diabeteslevel/:id", controller_outpatientscreening.GetDiabetesLevel)
			protected.POST("/diabeteslevels", controller_outpatientscreening.CreateDiabetesLevel)
			protected.PATCH("/diabeteslevels", controller_outpatientscreening.UpdateDiabetesLevel)
			protected.DELETE("/diabeteslevels/:id", controller_outpatientscreening.DeleteDiabetesLevel)

			// EmergencyLevel Routes
			protected.GET("/emergencylevels", controller_outpatientscreening.ListEmergencyLevels)
			protected.GET("/emergencylevel/:id", controller_outpatientscreening.GetEmergencyLevel)
			protected.POST("/emergencylevels", controller_outpatientscreening.CreateEmergencyLevel)
			protected.PATCH("/emergencylevels", controller_outpatientscreening.UpdateEmergencyLevel)
			protected.DELETE("/emergencylevels/:id", controller_outpatientscreening.DeleteEmergencyLevel)

			// HighBloodPressureLevel Routes
			protected.GET("/highbloodpressurelevels", controller_outpatientscreening.ListHighBloodPressureLevels)
			protected.GET("/highbloodpressurelevel/:id", controller_outpatientscreening.GetHighBloodPressureLevel)
			protected.POST("/highbloodpressurelevels", controller_outpatientscreening.CreateHighBloodPressureLevel)
			protected.PATCH("/highbloodpressurelevels", controller_outpatientscreening.UpdateHighBloodPressureLevel)
			protected.DELETE("/highbloodpressurelevels/:id", controller_outpatientscreening.DeleteHighBloodPressureLevel)

			// ObesityLevel Routes
			protected.GET("/obesitylevels", controller_outpatientscreening.ListObesityLevels)
			protected.GET("/obesitylevel/:id", controller_outpatientscreening.GetObesityLevel)
			protected.POST("/obesitylevels", controller_outpatientscreening.CreateObesityLevel)
			protected.PATCH("/obesitylevels", controller_outpatientscreening.UpdateObesityLevel)
			protected.DELETE("/obesitylevels/:id", controller_outpatientscreening.DeleteObesityLevel)

			// QueuingMangement Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			// ServicePoint Routes
			protected.GET("/ServicePoint", controller_queuingmanagement.ListServicePoints)
			protected.GET("ServicePoint/:id", controller_queuingmanagement.GetServicePoint)
			protected.POST("/ServicePoints", controller_queuingmanagement.CreateServicePoint)

			// ServiceChannel Routes
			protected.GET("/ServiceChannel", controller_queuingmanagement.ListServiceChannel)
			protected.GET("/ServiceChannel/:id", controller_queuingmanagement.GetServiceChannel)
			protected.POST("/ServiceChannels", controller_queuingmanagement.CreateServiceChannel)

			// MedicalAction Routes
			protected.GET("/MedicalAction", controller_queuingmanagement.ListMedicalAction)
			protected.GET("/MedicalAction/:id", controller_queuingmanagement.GetMedicaAction)
			protected.POST("/MedicalActions", controller_queuingmanagement.CreateMedicalAction)

			// Queu Routes
			protected.GET("/queuingManagement", controller_queuingmanagement.ListQueuingManagements)
			protected.GET("/queuingManagement/:id", controller_queuingmanagement.GetQueuingManagement)
			protected.GET("/queuingManagements/count", controller_queuingmanagement.GetCountQueuingManagements)
			protected.DELETE("/queuingManagements/:id", controller_queuingmanagement.DeleteQueuingManagement)
			protected.POST("/queuingManagements", controller_queuingmanagement.CreateQueuingManagements)
			// Appointment Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/appointments", controller_appointment.ListAppointments)
			protected.GET("/appointment/:id", controller_appointment.GetAppointment)
			protected.POST("/appointments", controller_appointment.CreateAppointmet)
			protected.PATCH("/appointments", controller_appointment.UpdateAppointment)
			protected.DELETE("/appointments/:id", controller_appointment.DeleteAppointment)

			// DiagnosisRecord Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/diagnosisrecords", controller_diagnosisrecord.ListDiagnosisRecords)
			protected.GET("/diagnosisrecord/:id", controller_diagnosisrecord.GetDiagnosisRecord)
			protected.POST("/diagnosisrecords", controller_diagnosisrecord.CreateDiagnosisRecord)
			protected.PATCH("/diagnosisrecords", controller_diagnosisrecord.UpdateDiagnosisRecord)
			protected.DELETE("/diagnosisrecords/:id", controller_diagnosisrecord.DeleteDiagnosisRecord)

			// Disease Routes
			protected.GET("/diseases", controller_diagnosisrecord.ListDiseases)
			protected.GET("/disease/:id", controller_diagnosisrecord.GetDisease)
			protected.POST("/diseases", controller_diagnosisrecord.CreateDisease)
			protected.PATCH("/diseases", controller_diagnosisrecord.UpdateDisease)
			protected.DELETE("/diseases/:id", controller_diagnosisrecord.DeleteDisease)

			// PatientRight ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/patientrights", controller_patientright.ListPatientRights)
			protected.GET("/patientright/:id", controller_patientright.GetPatientRights)
			protected.POST("/patientrights", controller_patientright.CreatePatientrights)
			protected.PATCH("/patientrights", controller_patientright.UpdatePatientRights)
			protected.DELETE("/patientrights/:id", controller_patientright.DeletePatientRights)

			// Hospital Routes
			protected.GET("/hospitals", controller_patientright.ListHospital)
			protected.GET("/hospital/:id", controller_patientright.GetHospital)
			protected.POST("/hospitals", controller_patientright.CreateHospital)
			protected.PATCH("/hospitals", controller_patientright.UpdateHospital)
			protected.DELETE("/hospitals/:id", controller_patientright.DeleteHospital)

			// RightType Routes
			protected.GET("/patienttypes", controller_patientright.ListPatientType)
			protected.GET("/patienttype/:id", controller_patientright.GetRightType)
			protected.POST("/patienttypes", controller_patientright.CreateRightType)
			protected.PATCH("/patienttypes", controller_patientright.UpdatePatientType)
			protected.DELETE("/patienttypes/:id", controller_patientright.DeletePatientType)

			// TreatmentRecord ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/treatmentrecords", controller_treatmentrecord.ListTreatmentRecords)
			protected.GET("/treatmentrecord/:id", controller_treatmentrecord.GetTreatmentRecord)
			protected.GET("/treatmentrecord/medicineorder/:id", controller_treatmentrecord.GetTreatmentRecordforMed)
			protected.POST("/treatmentrecords", controller_treatmentrecord.CreateTreatmentRecord)
			protected.PATCH("/treatmentrecords", controller_treatmentrecord.UpdateTreatmentRecord)
			protected.DELETE("/treamentrecords/:id", controller_treatmentrecord.DeleteTreatmentRecord)

			// Medicine
			protected.GET("/medicines", controller_treatmentrecord.ListMedicines)
			protected.GET("/medicine/:id", controller_treatmentrecord.GetMedicine)
			protected.POST("/medicines", controller_treatmentrecord.CreateMedicine)
			protected.PATCH("/medicines", controller_treatmentrecord.UpdateMedicine)
			protected.DELETE("/medicines/:id", controller_treatmentrecord.DeleteMedicine)

			// WorkLoad Routes ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/workloads", controller_workload.ListWorkload)
			protected.GET("/workload/:id", controller_workload.GetWorkload)
			protected.POST("/workload", controller_workload.CreateWorkload)
			protected.PATCH("/workload", controller_workload.UpdateWorkload)
			protected.DELETE("/workloads/:id", controller_workload.DeleteWorkload)
			//Room
			protected.GET("/room/:id", controller_workload.GetRoom)
			protected.GET("/rooms", controller_workload.ListRoom) //ดึง Room
			//Status
			protected.GET("/status/:id", controller_workload.GetStatus)
			protected.GET("/statuses", controller_workload.ListStatus) //ดึง Status

			// MedicineRecord Routes ----------------------------------------------------------------------------------------------------------------------------------
			protected.POST("/createmedicinerecord", controller_medicinerecord.CreateMedicineRecord)
			protected.GET("/medicinerecords", controller_medicinerecord.ListMedicineRecords)
			protected.GET("/medicinerecord/:id", controller_medicinerecord.GetMedicineRecord)
			protected.PATCH("/medicinerecord", controller_medicinerecord.UpdateMedicineRecord)
			protected.DELETE("/medicinerecords/:id", controller_medicinerecord.DeleteMedicineRecord)

			//StatusMed Routes
			protected.GET("/statusmeds", controller_medicinerecord.ListStatusMeds)
			protected.GET("/statusmed/:id", controller_medicinerecord.GetStatusMed)

			// Payment ------------------------------------------------------------------------------------------------------------------------------------------------
			protected.GET("/payments", controller_payment.ListPayments)
			protected.GET("/payment/:id", controller_payment.GetPayment)
			protected.POST("/payments", controller_payment.CreatePayment)
			protected.PATCH("/payments", controller_payment.UpdatePayment)
			protected.DELETE("/payments/:id", controller_payment.DeletePayment)

			protected.GET("/getmedbypatient/:id", controller_payment.GetMedbyPatient)

			// PaymentType Routes
			protected.GET("/paymenttypes", controller_payment.ListPaymentTypes)
			protected.GET("/paymenttype/:id", controller_payment.GetPaymentType)
			protected.POST("/paymenttypes", controller_payment.CreatePaymentType)
			protected.PATCH("/paymenttypes", controller_payment.UpdatePaymentType)
			protected.DELETE("/paymenttypes/:id", controller_payment.DeletePaymentType)
		}
	}

	// Run the server
	// r.POST("/login", controller.Login)
	// r.POST("/login/employee", controller.LoginEmployee)
	r.Run()
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
