package entity

import (
	"fmt"
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// ===========================Structure PatientRegister============================//
type PatientRegister struct {
	gorm.Model
	FirstName            string
	LastName             string
	IdentificationNumber string    `valid:"required"`
	Age                  int       `valid:"int, range(0|100)~Age Invalids"`
	BirthDay             time.Time `valid:"past~Birth Day Invalids"`
	Mobile               string
	Occupation           string
	Address              string

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	PatientRegisterGenderID *uint
	PatientRegisterGender   PatientRegisterGender `gorm:"references:id" valid:"-"`

	PrefixID *uint
	Prefix   Prefix `gorm:"references:id" valid:"-"`

	NationalityID *uint
	Nationality   Nationality `gorm:"references:id" valid:"-"`

	ReligionID *uint
	Religion   Religion `gorm:"references:id" valid:"-"`

	BloodTypeID *uint
	BloodType   BloodType `gorm:"references:id" valid:"-"`

	MaritalStatusID *uint
	MaritalStatus   MaritalStatus `gorm:"references:id" valid:"-"`

	SubDistrictID *uint
	SubDistrict   SubDistrict `gorm:"references:id" valid:"-"`

	DistrictID *uint
	District   District `gorm:"references:id" valid:"-"`

	ProvinceID *uint
	Province   Province `gorm:"references:id" valid:"-"`

	Patientrights []PatientRight `gorm:"foreignKey:PatientRegisterID"`
	HistorySheets []HistorySheet `gorm:"foreignKey:PatientRegisterID"`
	Appointment   []Appointment  `gorm:"foreignKey:PatientRegisterID"`
}

type PatientRegisterGender struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:PatientRegisterGenderID"`
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
	District   District `gorm:"references:id" valid:"-"`

	PostCode uint

	PatientRegisters []PatientRegister `gorm:"foreignKey:SubDistrictID"`
}

type District struct {
	gorm.Model
	Name string

	ProvinceID uint
	Province   Province `gorm:"references:id" valid:"-"`

	PatientRegisters []PatientRegister `gorm:"foreignKey:DistrictID"`
	SubDistricts     []SubDistrict     `gorm:"foreignKey:DistrictID"`
}

type Province struct {
	gorm.Model
	Name             string
	PatientRegisters []PatientRegister `gorm:"foreignKey:ProvinceID"`
	Districts        []District        `gorm:"foreignKey:ProvinceID"`
}

// ===========================Structure HistorySheet============================//
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
	PatientRegister   PatientRegister `gorm:"references:id" valid:"-"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	DrugAllergyID        *uint
	DrugAllergy          DrugAllergy           `gorm:"references:id" valid:"-"`
	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:HistorySheetID"`
}

type DrugAllergy struct {
	gorm.Model
	Name          string
	HistorySheets []HistorySheet `gorm:"foreignKey:DrugAllergyID"`
}

// ===========================Structure PatientRight============================//
type PatientRight struct {
	gorm.Model

	RightTypeID *uint
	RightType   RightType `gorm:"references:id" valid:"-"`

	HospitalID *uint
	Hospital   Hospital `gorm:"references:id" valid:"-"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	Note string `valid:"required~Note cannot be blank"`

	DateRecord time.Time `valid:"Now~Time must be Now"`

	PatientRegisterID *uint
	PatientRegister   PatientRegister `gorm:"references:id" valid:"-"`

	Payments []Payment `gorm:"foreignKey:PatientRightID" valid:"-"`
}

type RightType struct {
	gorm.Model
	Typename     string
	Discount     uint
	PatientRight []PatientRight `gorm:"foreignKey:RightTypeID"`
}

type Hospital struct {
	gorm.Model
	Name         string
	Local        string
	PatientRight []PatientRight `gorm:"foreignKey:HospitalID"`
}

// ===========================Structure Appointment============================//
type Appointment struct {
	gorm.Model

	AppointmentTime time.Time `valid:"future~AppointmentTime must be in the future"`
	Note            string    `valid:"required~Note cannot be blank"`
	// RoomNumber      int       `valid:"required~RoomNumber cannot be blank,positivenum~RoomNumber more than 0"`

	//PatientID ทำหน้าที่เป็น FK
	PatientRegisterID *uint
	PatientRegister   PatientRegister `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	//EmployeeID ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	//ClinicID ทำหน้าที่เป็น FK
	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation
}

// ===========================QueuingManagement============================//
// ช่องบริการ
type ServiceChannel struct {
	gorm.Model
	Name string

	// 1 Sequence สามารถจัดลำดับคิวคนไข้ได้หลายคน
	QueuingManagement []QueuingManagement `gorm:"foreignKey:ServiceChannelID"`
}

// จุดบริการ
type ServicePoint struct {
	gorm.Model
	Name   string
	Detail string

	//1 service point สามารถจัดลำดับคิวคนไข้ได้หลายคิว (QueuingManagement)
	QueuingManagement []QueuingManagement `gorm:"foreignKey:ServicePointID"`
}

type MedicalAction struct {
	gorm.Model
	Action string
	Detail string

	QueuingManagement []QueuingManagement `gorm:"foreignKey:MedicalActionID"`
}

type QueuingManagement struct {
	gorm.Model
	Note      string    `valid:"required~กรุณากรอกการซักประวัติเพิ่มเติม"`
	Date      time.Time `valid:"present~Date must be present"`
	TimeStart time.Time `valid:"future~Start Time must be future"`
	TimeEnd   time.Time `valid:"future~End Time must be future"`

	// 1 QueuingManagement สามารถจัดลำดับคิวคนไข้ได้หลายคน (PatientRegister)
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	HistorySheetID *uint
	HistorySheet   HistorySheet `gorm:"references:id" valid:"-"`

	ServicePointID *uint
	ServicePoint   ServicePoint `gorm:"references:ID" valid:"-"`

	ServiceChannelID *uint
	ServiceChannel   ServiceChannel `gorm:"references:ID" valid:"-"`

	MedicalActionID *uint
	MedicalAction   MedicalAction `gorm:"references:ID" valid:"-"`
}

// ===========================Outpatient Screenings============================//
// EmergencyLevel
type EmergencyLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string
	procedure       string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:EmergencyLevelID"`
}

// HighBloodPressureLevel
type HighBloodPressureLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:HighBloodPressureLevelID"`
}

// DiabetesLevel
type DiabetesLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:DiabetesLevelID"`
}

// ObesityLevel
type ObesityLevel struct {
	gorm.Model

	Level           string
	AssessmentForms string

	OutpatientScreenings []OutpatientScreening `gorm:"foreignKey:ObesityLevelID"`
}

// OutpatientScreening
type OutpatientScreening struct {
	gorm.Model
	Note      string    `valid:"required~กรุณากรอกการซักประวัติเพิ่มเติม"`
	Date      time.Time `valid:"present~Date must be present"`
	TimeStart time.Time `valid:"future~Start Time must be future"`
	TimeEnd   time.Time `valid:"future~End Time must be future"`

	HistorySheetID *uint
	HistorySheet   HistorySheet `gorm:"references:id" valid:"-"`

	EmergencyLevelID *uint
	EmergencyLevel   EmergencyLevel `gorm:"references:ID" valid:"-"`

	HighBloodPressureLevelID *uint
	HighBloodPressureLevel   HighBloodPressureLevel `gorm:"references:ID" valid:"-"`

	DiabetesLevelID *uint
	DiabetesLevel   DiabetesLevel `gorm:"references:ID" valid:"-"`

	ObesityLevelID *uint
	ObesityLevel   ObesityLevel `gorm:"references:ID" valid:"-"`
}

// ===========================Structure Workload============================//
type Room struct {
	gorm.Model
	Name        string
	Workload    []Workload    `gorm:"foreignKey:RoomID"`
	Appointment []Appointment `gorm:"foreignKey:RoomID"`
}

type Status struct {
	gorm.Model
	Name     string
	Workload []Workload `gorm:"foreignKey:StatusID"`
}

type Workload struct {
	gorm.Model
	//AdminID ทำหน้าที่ FK
	AdminID    *uint
	Admin      Admin `gorm:"references:id" valid:"-"`
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`
	//RoomID ทำหน้าที่ FK
	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`
	//StatusID ทำหน้าที่ FK
	StatusID  *uint
	Status    Status    `gorm:"references:id" valid:"-"`
	Date      time.Time `valid:"present~Date must be present"`
	StartTime time.Time `valid:"future~Start Time must be future"`
	EndTime   time.Time `valid:"future~End Time must be future"`
}

// ===========================Structure Employee============================//
type Admin struct {
	gorm.Model
	FirstName string
	LastName  string
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Employee  []Employee `gorm:"foreignKey:AdminID"`
	Workload  []Workload `gorm:"foreignKey:AdminID"`
}

type Title struct {
	gorm.Model
	Name     string
	Employee []Employee `gorm:"foreignKey:TitleID"`
}

type Role struct {
	gorm.Model
	Name     string
	Employee []Employee `gorm:"foreignKey:RoleID"`
}

type Gender struct {
	gorm.Model
	Name     string
	Employee []Employee `gorm:"foreignKey:GenderID"`
}

type Employee struct {
	gorm.Model
	//AdminID ทำหน้าที่ FK
	AdminID *uint
	Admin   Admin
	IDCard  string `gorm:"uniqueIndex" valid:"required~Identification Number cannot be blank, matches(^[1-9]\\d{12}$)~IDCard does not validate"`
	//TitleID ทำหน้าที่ FK
	TitleID   *uint
	Title     Title
	FirstName string `valid:"required~First Name cannot be blank"`
	LastName  string `valid:"required~Last Name cannot be blank"`
	//RoleID ทำหน้าที่ FK
	RoleID      *uint
	Role        Role
	PhoneNumber string `valid:"required~Phone Number cannot be blank, matches(^[0]{1}[689]{1}[0-9]{8})~Phone Number must be invalid"`
	Email       string `gorm:"uniqueIndex" valid:"required~Email cannot be blank, email~Email does not validate as email"`
	Password    string `valid:"required~Password cannot be blank"`
	//GenderID ทำหน้าที่ FK
	GenderID *uint
	Gender   Gender
	Salary   float64   `valid:"required~Salary must not be zero,salary~Salary must not be negative"`
	Birthday time.Time `valid:"past~Birthday: The following validator is invalid or can't be applied to the field: \"past\""`

	PatientRegisters []PatientRegister `gorm:"foreignKey:EmployeeID"`
	HistorySheets    []HistorySheet    `gorm:"foreignKey:EmployeeID"`
	//Outpatient Screening System
	// OutpatientScreening []OutpatientScreening `gorm:"foreignKey:EmployeeID"`
	Appointment     []Appointment    `gorm:"foreignKey:EmployeeID"`
	PatientRight    []PatientRight   `gorm:"foreignKey:EmployeeID"`
	Payments        []Payment        `gorm:"foreignKey:EmployeeID"`
	MedicineRecords []MedicineRecord `gorm:"foreignKey:EmployeeID" `
}

//=================MedicineRecord=========================

type MedicineRecord struct {
	gorm.Model

	MedTime    time.Time `valid:"present~MedTime incorrect"`
	Advicetext string    `valid:"required~Advicetext cannot be blank"`
	// EmployeeID ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee `gorm:"references:ID" valid:"-"`

	//TreatmentRecordID ทำหน้าที่เป็น ForeignKey
	TreatmentRecordID *uint
	TreatmentRecord   TreatmentRecord `gorm:"references:id" valid:"-"`

	//statusMedID ทำหน้าที่เป็น ForeignKey
	StatusMedID *uint
	StatusMed   StatusMed `gorm:"references:id" valid:"-"`
	Payments    []Payment `gorm:"foreignKey:MedicineRecordID" valid:"-"`
}
type StatusMed struct {
	gorm.Model
	Number uint
	Status string

	// 1 statusMed มีได้หลาย MedicineRecord
	MedicineRecords []MedicineRecord `gorm:"foreignKey: StatusMedID" valid:"-"`
}

//=====================Payment============================

type Payment struct {
	gorm.Model

	PaymentTime time.Time `valid:"present~PaymentTime incorrect"`
	Total       int       `valid:"Total~The value must be in range 0-9999"`

	PatientRightID *uint
	PatientRight   PatientRight `gorm:"references:ID" valid:"-"`

	PaymentTypeID *uint
	PaymentType   PaymentType `gorm:"references:ID" valid:"-"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:ID" valid:"-"`

	//MedicineRecordID ทำหน้าที่เป็น ForeignKey
	MedicineRecordID *uint
	MedicineRecord   MedicineRecord `gorm:"foreignKey: ID" valid:"-"`
}

type PaymentType struct {
	gorm.Model

	Type string

	Payments []Payment `gorm:"foreignKey:PaymentTypeID" valid:"-"`
}

//========================treatment record========================

type TreatmentRecord struct {
	gorm.Model

	//DoctorID เป็น FK
	DoctorID *uint
	Doctor   Employee `gorm:"references:id" valid:"-"`

	//DiagnosisRecord เป็น FK
	DiagnosisRecordID *uint
	DiagnosisRecord   DiagnosisRecord `gorm:"references:id" valid:"-"`

	Treatment   string `valid:"required~Treatment cannot be blank"`
	Note        string `valid:"-"`
	Appointment *bool

	MedicineOrders []MedicineOrder `gorm:"foreignKey:TreatmentRecordID;  constraint:OnDelete:CASCADE"`

	Date time.Time `valid:"present~Date must be present"`
}

type Medicine struct {
	gorm.Model

	Name        string
	Description string
	Price       float32

	MedicineOrder []MedicineOrder `gorm:"foreignKey:MedicineID"`
}

type MedicineOrder struct {
	gorm.Model

	OrderAmount int `valid:"int, range(0|100)~Order Amount must not be negative"`

	MedicineID *uint
	Medicine   Medicine `gorm:"refernces:ID" valid:"-"`

	TreatmentRecordID *uint
	TreatmentRecord   TreatmentRecord `gorm:"references:ID" valid:"-"`
}

// ========================= diagnosis record ======================

type DiagnosisRecord struct {
	gorm.Model

	//DoctorID เป็น FK
	DoctorID *uint
	Doctor   Employee `gorm:"references:ID" valid:"-"`

	//HistorySheetID เป็น FK
	HistorySheetID *uint
	HistorySheet   HistorySheet `gorm:"references:ID" valid:"-"`

	//DiseaseID เป็น FK
	DiseaseID *uint
	Disease   Disease `gorm:"references:ID" valid:"-"`

	Examination        string `valid:"required~Examination cannot be Blank"`
	MedicalCertificate *bool
	Date               time.Time `valid:"present~Date must be present"`

	TreatmentRecords []TreatmentRecord `gorm:"foreignKey:DiagnosisRecordID"`
}
type Disease struct {
	gorm.Model

	Name        string
	Description string

	DiagnosisRecords []DiagnosisRecord `gorm:"foreignKey:DiseaseID"`
}

// ========================= function init ==========================
func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("Now", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute*-2)) && t.Before(time.Now().Add(time.Minute*2))
	})

	govalidator.CustomTypeTagMap.Set("DelayNow3Min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(3 - time.Minute))
	})

	govalidator.CustomTypeTagMap.Set("positivenum", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) > 0
	})

	govalidator.CustomTypeTagMap.Set("DelayNow3Min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(3 - time.Minute))
	})

	govalidator.CustomTypeTagMap.Set("salary", func(i interface{}, context interface{}) bool {
		t := i.(float64)
		return t >= 1
	})

	govalidator.CustomTypeTagMap.Set("present", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Hour*-12)) && t.Before(time.Now().Add(time.Hour*12))
	})

	govalidator.CustomTypeTagMap.Set("Total", func(i interface{}, context interface{}) bool {
		return govalidator.InRangeInt(int(i.(int)), 0, 9999)
	})
}

// ใช้แค่ validate backend Treatment Record เท่านั้น
func BooleanNotNull(t *bool) (bool, error) {
	if t == nil {
		return false, fmt.Errorf("Appointment cannot be Null")
	} else {
		return true, nil
	}
}

// ใช้แค่ validate backend Diagnosis Record เท่านั้น
func CheckBool(t *bool) (bool, error) {
	if t == nil {
		return false, fmt.Errorf("MedicalCertificate cannot be Null")
	} else {
		return true, nil
	}
}

func CheckTimeEnd(t time.Time, t2 time.Time) (bool, error) {
	if t.After(t2) {
		return true, nil
	} else {
		return false, fmt.Errorf("เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด")
	}
}
