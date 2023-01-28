package entity

import (
	"time"

	"gorm.io/gorm"
)

type Nurse struct {
	gorm.Model
	FirstName            string
	LastName             string
	IdentificationNumber string
	BirthDay             time.Time
	Mobile               string
	Address              string
	Salary               uint16
	HistorySheets        []HistorySheet `gorm:"foreignKey:NurseID"`
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

	OutpatientScreeningID *uint
	OutpatientScreening   OutpatientScreening `gorm:"references:ID"`

	NurseID *uint
	Nurse   Nurse `gorm:"references:ID"`
}

type HighBloodPressureLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:HighBloodPressureLevelID"`
}
type DiabetesLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:DiabetesLevelID"`
}
type ObesityLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:ObesityLevelID"`
}

type OutpatientScreening struct {
	gorm.Model

	HighBloodPressureLevelID *uint
	HighBloodPressureLevel   HighBloodPressureLevel `references:"ID"`

	DiabetesLevelID *uint
	DiabetesLevel   DiabetesLevel `references:"ID"`

	ObesityLevelID *uint
	ObesityLevel   ObesityLevel `references:"ID"`
}
