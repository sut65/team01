package entity

import (
	"time"

	"gorm.io/gorm"
)

type HistorySheet struct {
	gorm.Model
	Weight                 float32 `valid:"float, range(0|500)~Weight Invalids"`
	Height                 float32
	Temperature            float32
	SystolicBloodPressure  uint8
	DiastolicBloodPressure uint8
	HeartRate              int `valid:"int, range(0|100)~Heart Rate Invalids"`
	RespiratoryRate        uint8
	OxygenSaturation       uint8
	DrugAllergySymtom      string
	PatientSymtom          string `valid:"required~Symtom of Patient Invalids"`

	PatientRegisterID *uint
	PatientRegister   PatientRegister `gorm:"references:ID"`

	NurseID *uint
	Nurse   Nurse `gorm:"references:ID"`

	DrugAllergyID *uint
	DrugAllergy   DrugAllergy `gorm:"references:ID"`
}

type Nurse struct {
	gorm.Model
	FirstName            string
	LastName             string
	IdentificationNumber string
	BirthDay             time.Time
	Mobile               string
	Email                string
	Password             string
	Salary               uint16
	HistorySheets        []HistorySheet `gorm:"foreignKey:NurseID"`
}

type DrugAllergy struct {
	gorm.Model
	Name          string
	HistorySheets []HistorySheet `gorm:"foreignKey:DrugAllergyID"`
}
type PatientRegister struct {
	gorm.Model
	FirstName                              string
	LastName                               string
	IdentificationNumber                   string // `gorm:"uniqueIndex"`
	Age                                    uint8
	BirthDay                               time.Time
	Mobile                                 string
	Email                                  string // `gorm:"uniqueIndex"`
	Occupation                             string
	Address                                string
	EmergencyPersonFirstName               string
	EmergencyPersonLastName                string
	EmergencyPersonMobile                  string
	EmergencyPersonOccupation              string
	EmergencyPersonRelationshipWithPatient string
	Gender                                 string
	Prefix                                 string
	Nationality                            string
	Religion                               string
	BloodType                              string
	MaritalStatus                          string
	SubDistrict                            string
	District                               string
	Province                               string

	// EmployeeID *uint
	// Employee   Employee `gorm:"references:ID"`

	// GenderID *uint
	// Gender   Gender `gorm:"references:ID"`

	// PrefixID *uint
	// Prefix   Prefix `gorm:"references:ID"`

	// NationalityID *uint
	// Nationality   Nationality `gorm:"references:ID"`

	// ReligionID *uint
	// Religion   Religion `gorm:"references:ID"`

	// BloodTypeID *uint
	// BloodType   BloodType `gorm:"references:ID"`

	// MaritalStatusID *uint
	// MaritalStatus   MaritalStatus `gorm:"references:ID"`

	// SubDistrictID *uint
	// SubDistrict   SubDistrict `gorm:"references:ID"`

	// DistrictID *uint
	// District   District `gorm:"references:ID"`

	// ProvinceID *uint
	// Province   Province `gorm:"references:ID"`

	HistorySheets []HistorySheet `gorm:"foreignKey:NurseID"`
}

// type Employee struct {
// 	gorm.Model
// 	FirstName            string
// 	LastName             string
// 	IdentificationNumber string
// 	BirthDay             time.Time
// 	Mobile               string
// 	Email                string
// 	Password             string
// 	Salary               uint16
// 	HistorySheets        []HistorySheet `gorm:"foreignKey:EmployeeID"`
// }

// type Gender struct {
// 	gorm.Model
// 	Name             string
// 	PatientRegisters []PatientRegister `gorm:"foreignKey:GenderID"`
// }

// type Prefix struct {
// 	gorm.Model
// 	Name             string
// 	PatientRegisters []PatientRegister `gorm:"foreignKey:PrefixID"`
// }

// type Nationality struct {
// 	gorm.Model
// 	Name             string
// 	PatientRegisters []PatientRegister `gorm:"foreignKey:NationalityID"`
// }

// type Religion struct {
// 	gorm.Model
// 	Name             string
// 	PatientRegisters []PatientRegister `gorm:"foreignKey:ReligionID"`
// }

// type BloodType struct {
// 	gorm.Model
// 	Name             string
// 	PatientRegisters []PatientRegister `gorm:"foreignKey:BloodTypeID"`
// }

// type MaritalStatus struct {
// 	gorm.Model
// 	Name             string
// 	PatientRegisters []PatientRegister `gorm:"foreignKey:MaritalStatusID"`
// }

// type SubDistrict struct {
// 	gorm.Model
// 	Name string

// 	DistrictID uint
// 	District   District // `gorm:"references:ID"`

// 	PostCode uint

// 	PatientRegisters []PatientRegister `gorm:"foreignKey:SubDistrictID"`
// }

// type District struct {
// 	gorm.Model
// 	Name string

// 	ProvinceID uint
// 	Province   Province `gorm:"references:ID"`

// 	PatientRegisters []PatientRegister `gorm:"foreignKey:DistrictID"`
// 	SubDistricts     []SubDistrict     `gorm:"foreignKey:DistrictID"`
// }

// type Province struct {
// 	gorm.Model
// 	Name             string
// 	PatientRegisters []PatientRegister `gorm:"foreignKey:ProvinceID"`
// 	Districts        []District        `gorm:"foreignKey:ProvinceID"`
// }
