package entity

import (
	"time"
	"gorm.io/gorm"
)

type Disease struct {
	
	gorm.Model

	Name		string
	Description	string

	DiagnosisRecords	[]DiagnosisRecord	`gorm:"foreignKey:DiseaseID"`
}

type DiagnosisRecord struct {

	gorm.Model

	//PartientID เป็น FK
	PatientID			*uint
	Patient				PatientRegister	`gorm:"references:ID"`

	//DoctorID เป็น FK
	DoctorID			*uint
	Doctor				Employee		`gorm:"references:ID"`

	//HistorySheetID เป็น FK
	HistorySheetID		*uint
	HistorySheet		HistorySheet	`gorm:"references:ID"`

	//DiseaseID เป็น FK
	DiseaseID			*uint
	Disease				Disease			`gorm:"references:ID"`
	
	Examination			string
	MedicalCertificate 	bool	
	Date				time.Time

}