package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type PatientRegister struct {
	gorm.Model
	FirstName                              string
	LastName                               string
	IdentificationNumber                   string    `valid:"required"`
	Age                                    int       `valid:"int, range(0|100)~Age Invalids"`
	BirthDay                               time.Time `valid:"past~Birth Day Invalids"`
	Mobile                                 string
	Occupation                             string
	Address                                string
	EmergencyPersonFirstName               string
	EmergencyPersonLastName                string
	EmergencyPersonMobile                  string
	EmergencyPersonOccupation              string
	EmergencyPersonRelationshipWithPatient string

	EmployeeID *uint
	Employee   Employee `gorm:"references:ID"`

	GenderID *uint
	Gender   Gender `gorm:"references:ID"`

	PrefixID *uint
	Prefix   Prefix `gorm:"references:ID"`

	NationalityID *uint
	Nationality   Nationality `gorm:"references:ID"`

	ReligionID *uint
	Religion   Religion `gorm:"references:ID"`

	BloodTypeID *uint
	BloodType   BloodType `gorm:"references:ID"`

	MaritalStatusID *uint
	MaritalStatus   MaritalStatus `gorm:"references:ID"`

	SubDistrictID *uint
	SubDistrict   SubDistrict `gorm:"references:ID"`

	DistrictID *uint
	District   District `gorm:"references:ID"`

	ProvinceID *uint
	Province   Province `gorm:"references:ID"`

	// HistorySheets []HistorySheet `gorm:"foreignKey:NurseID"`
}

type Gender struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:GenderID"`
}

type Prefix struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:PrefixID"`
}

type Nationality struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:NationalityID"`
}

type Religion struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:ReligionID"`
}

type BloodType struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:BloodTypeID"`
}

type MaritalStatus struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:MaritalStatusID"`
}

type SubDistrict struct {
	gorm.Model
	Name string

	DistrictID uint
	District   District // `gorm:"references:ID"`

	PostCode uint

	PatientRegisters []PatientRegister `gorm:"foreignKey:SubDistrictID"`
}

type District struct {
	gorm.Model
	Name string

	ProvinceID uint
	Province   Province `gorm:"references:ID"`

	PatientRegisters []PatientRegister `gorm:"foreignKey:DistrictID"`
	SubDistricts     []SubDistrict     `gorm:"foreignKey:DistrictID"`
}

type Province struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:ProvinceID"`
	Districts        []District        `gorm:"foreignKey:ProvinceID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})
}
