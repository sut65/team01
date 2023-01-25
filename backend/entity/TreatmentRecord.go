package entity

import (
	"time"
	"gorm.io/gorm"
)

type TreatmentRecord struct {
	
	gorm.Model

	//PartientID เป็น FK
	PatientID			*uint
	Patient				PatientRegister	`gorm:"references:ID"`

	//DoctorID เป็น FK
	DoctorID			*uint
	Doctor				Employee			`gorm:"references:ID"`
	
	//DiagnosisRecord เป็น FK
	DiagnosisRecordID	*uint
	DiagnosisRecord		DiagnosisRecord		`gorm:"references:ID"`

	Treatment			string
	Note				string
	
	//MedicineID เป็น FK
	MedicineID			*uint
	Medicine			Medicine		`gorm:"reference:ID"`
	MedicineQuantity	int

	Date				time.Time
	
}

type Medicine struct {
	
	gorm.Model

	Name		string
	Description	string
	Quantity 	int

	TreatmentRecords	[]TreatmentRecord	`gorm:"foreignKey:MedicineID"`
}