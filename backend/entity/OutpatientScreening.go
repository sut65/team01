package entity

import (
	"time"
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Nurse struct {
	gorm.Model
	FirstName            string
	LastName             string
	Email                string `gorm:"uniqueIndex"`
	Password             string
	IdentificationNumber string
	BirthDay             time.Time
	Mobile               string
	Address              string
	Salary               uint16

	// 1 Nurse สามารถลงบันทึกได้หลาย HistorySheet
	HistorySheets []HistorySheet `gorm:"foreignKey:NurseID"`
}

type HistorySheet struct {
	gorm.Model
	Weight                 float32
	Height                 float32
	BMI                    float32
	Temperature            float32
	SystolicBloodPressure  uint16
	DiastolicBloodPressure uint16
	HeartRate              uint8
	RespiratoryRate        uint8
	OxygenSaturation       uint8
	DrugAllergySymtom      string
	PatientSymtom          string

	// 1 HistorySheet สามารถมีการประเมินได้หลายครั้ง (OutpatientScreening)
	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:HistorySheetID"`

	// NurseID คือ Foreign Key ที่อ้างอิงไปยัง Nurse
	NurseID *uint
	Nurse   Nurse `gorm:"references:ID"`
}

// EmergencyLevel
type EmergencyLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string
	procedure       string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:EmergencyLevelID"`
}

type HighBloodPressureLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:HighBloodPressureLevelID"`
}
type DiabetesLevel struct {
	gorm.Model

	Level             string
	AssessmentForms   string
	HistoryTakingForm string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:DiabetesLevelID"`
}
type ObesityLevel struct {
	gorm.Model

	Level             string
	AssessmentForms   string
	HistoryTakingForm string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:ObesityLevelID"`
}

type OutpatientScreening struct {
	gorm.Model
	Note string				`valid:"required~Note cannot be blank"`
	Time time.Time

	HistorySheetID *uint
	HistorySheet   HistorySheet `gorm:"references:ID"`

	EmergencyLevelID *uint
	EmergencyLevel   EmergencyLevel `gorm:"references:ID"`

	HighBloodPressureLevelID *uint
	HighBloodPressureLevel   HighBloodPressureLevel `gorm:"references:ID"`

	DiabetesLevelID *uint
	DiabetesLevel   DiabetesLevel `gorm:"references:ID"`

	ObesityLevelID *uint
	ObesityLevel   ObesityLevel `gorm:"references:ID"`
}
