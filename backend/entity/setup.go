package entity

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("se-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema

	database.AutoMigrate(
		&Admin{},
		&Gender{},
		&Role{},
		&Title{},
		&Employee{},
		&Hospital{},
		&PatientRight{},
		&PatientRegister{},
		&DrugAllergy{},
		&HistorySheet{},
		&Disease{},
		&Medicine{},
		&MedicineRecord{},
		&Payment{},
		&PaymentType{},
		&StatusMed{},
		&OutpatientScreening{},
		&QueuingManagement{},
	)

	db = database
	//ผู้ดูแลระบบ
	PasswordAdmin1, err := bcrypt.GenerateFromPassword([]byte("123456789"), 14)
	Admin1 := Admin{
		FirstName: "พิมพ์ชนก",
		LastName:  "โสมศรี",
		Email:     "pimchanok@gmail.com",
		Password:  string(PasswordAdmin1),
	}
	db.Model(&Admin{}).Create(&Admin1)

	PasswordAdmin2, err := bcrypt.GenerateFromPassword([]byte("111111111"), 14)
	Admin2 := Admin{
		FirstName: "ศิริวรรณ",
		LastName:  "ประธาน",
		Email:     "sp@gmail.com",
		Password:  string(PasswordAdmin2),
	}
	db.Model(&Admin{}).Create(&Admin2)

	// PatientRegisterGender ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	patientregistergender1 := PatientRegisterGender{
		Name: "ชาย/Male",
	}
	db.Model(&PatientRegisterGender{}).Create(&patientregistergender1)

	patientregistergender2 := PatientRegisterGender{
		Name: "หญิง/FeMale",
	}
	db.Model(&PatientRegisterGender{}).Create(&patientregistergender2)

	patientregistergender3 := PatientRegisterGender{
		Name: "อื่นๆ/Other",
	}
	db.Model(&PatientRegisterGender{}).Create(&patientregistergender3)

	// Prefix -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	prefix1 := Prefix{Name: "เด็กชาย/Master"}
	db.Model(&Prefix{}).Create(&prefix1)

	prefix2 := Prefix{Name: "เด็กหญิง/นางสาว/Miss"}
	db.Model(&Prefix{}).Create(&prefix2)

	prefix3 := Prefix{Name: "นาย/Mister"}
	db.Model(&Prefix{}).Create(&prefix3)

	prefix4 := Prefix{Name: "นาง/Mistress"}
	db.Model(&Prefix{}).Create(&prefix4)
	// Religion -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	religion1 := Religion{Name: "พุทธ/Bhuddhism"}
	db.Model(&Religion{}).Create(&religion1)

	religion2 := Religion{Name: "คริสต์/Christian"}
	db.Model(&Religion{}).Create(&religion2)

	religion3 := Religion{Name: "อิสลาม/Islam"}
	db.Model(&Religion{}).Create(&religion3)

	religion4 := Religion{Name: "ฮินดู/Hinduism"}
	db.Model(&Religion{}).Create(&religion4)

	religion5 := Religion{Name: "ซิกข์/Sikhism"}
	db.Model(&Religion{}).Create(&religion5)
	// BloodType -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	bloodtype1 := BloodType{Name: "เอ/A"}
	db.Model(&BloodType{}).Create(&bloodtype1)

	bloodtype2 := BloodType{Name: "บี/B"}
	db.Model(&BloodType{}).Create(&bloodtype2)

	bloodtype3 := BloodType{Name: "โอ/O"}
	db.Model(&BloodType{}).Create(&bloodtype3)

	bloodtype4 := BloodType{Name: "เอบี/AB"}
	db.Model(&BloodType{}).Create(&bloodtype4)
	// MaritalStatus -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	maritalstatus1 := MaritalStatus{Name: "โสด/Single"}
	db.Model(&MaritalStatus{}).Create(&maritalstatus1)

	maritalstatus2 := MaritalStatus{Name: "แต่งงาน/สมรส/Married"}
	db.Model(&MaritalStatus{}).Create(&maritalstatus2)

	maritalstatus3 := MaritalStatus{Name: "หม้าย/Widowed"}
	db.Model(&MaritalStatus{}).Create(&maritalstatus3)

	maritalstatus4 := MaritalStatus{Name: "หย่าร้าง/Divorced"}
	db.Model(&MaritalStatus{}).Create(&maritalstatus4)

	maritalstatus5 := MaritalStatus{Name: "แยกกันอยู่/Saparated"}
	db.Model(&MaritalStatus{}).Create(&maritalstatus5)
	// DrugAllergy -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	drugallergy1 := DrugAllergy{
		Name: "แพ้ยา/Drug Allergy",
	}
	db.Model(&DrugAllergy{}).Create(&drugallergy1)

	drugallergy2 := DrugAllergy{
		Name: "ไม่แพ้ยา/Not Allergic",
	}
	db.Model(&DrugAllergy{}).Create(&drugallergy2)

	//ตำแหน่ง
	Doctor := Role{
		Name: "แพทย์",
	}
	db.Model(&Role{}).Create(&Doctor)
	Nurse := Role{
		Name: "พยาบาล",
	}
	db.Model(&Role{}).Create(&Nurse)
	Pharmacist := Role{
		Name: "เภสัชกร",
	}
	db.Model(&Role{}).Create(&Pharmacist)
	MedicalRecordsOfficer := Role{
		Name: "เจ้าหน้าที่เวชระเบียน",
	}
	db.Model(&Role{}).Create(&MedicalRecordsOfficer)
	CashierOfficer := Role{
		Name: "เจ้าหน้าที่การเงิน",
	}
	db.Model(&Role{}).Create(&CashierOfficer)

	//คำนำหน้า
	Title1 := Title{
		Name: "นาย",
	}
	db.Model(&Title{}).Create(&Title1)
	Title2 := Title{
		Name: "นาง",
	}
	db.Model(&Title{}).Create(&Title2)
	Title3 := Title{
		Name: "นางสาว",
	}
	db.Model(&Title{}).Create(&Title3)
	Title4 := Title{
		Name: "นายแพทย์",
	}
	db.Model(&Title{}).Create(&Title4)
	Title5 := Title{
		Name: "แพทย์หญิง",
	}
	db.Model(&Title{}).Create(&Title5)
	Title6 := Title{
		Name: "เภสัชกรชาย",
	}
	db.Model(&Title{}).Create(&Title6)
	Title7 := Title{
		Name: "เภสัชกรหญิง",
	}
	db.Model(&Title{}).Create(&Title7)

	//เพศ
	Gender1 := Gender{
		Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&Gender1)
	Gender2 := Gender{
		Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&Gender2)

	//PatientType Data
	Pt1 := RightType{
		Typename: "สิทธิ์สุขภาพถ้วนหน้า",
		Discount: 3000,
	}
	db.Model(&RightType{}).Create(&Pt1)
	Pt2 := RightType{
		Typename: "สิทธิประกันสังคม",
		Discount: 1000,
	}
	db.Model(&RightType{}).Create(&Pt2)
	Pt3 := RightType{
		Typename: "สิทธิค่าลดหย่อน",
		Discount: 500,
	}
	db.Model(&RightType{}).Create(&Pt3)
	Pt4 := RightType{
		Typename: "สิทธิประกันนักศึกษา",
		Discount: 300,
	}
	db.Model(&RightType{}).Create(&Pt4)

	Pt5 := RightType{
		Typename: "สิทธิบัตรสวัสดิการ",
		Discount: 50,
	}
	db.Model(&RightType{}).Create(&Pt5)

	//hospital Data
	Rama := Hospital{
		Name:  "Rama",
		Local: "แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400",
	}
	db.Model(&Hospital{}).Create(&Rama)
	Krungthap := Hospital{
		Name:  "Krungthap",
		Local: "1308, 9 ถ. มิตรภาพ ตำบลในเมือง อำเภอเมืองนครราชสีมา นครราชสีมา 30000",
	}
	db.Model(&Hospital{}).Create(&Krungthap)

	Srinakarin := Hospital{
		Name:  "Srinakarin",
		Local: "ตำบลในเมือง อำเภอเมืองขอนแก่น ขอนแก่น 40000",
	}
	db.Model(&Hospital{}).Create(&Srinakarin)
	Sirirath := Hospital{
		Name:  "Sirirath",
		Local: " 2 ถนน วังหลัง แขวงศิริราช เขตบางกอกน้อย กรุงเทพมหานคร 10700",
	}
	db.Model(&Hospital{}).Create(&Sirirath)

	//================Disease Data======================
	disease1 := Disease{
		Name: "ไม่มี",
	}
	db.Model(&Disease{}).Create(&disease1)

	disease2 := Disease{
		Name: "ไข้หวัดใหญ่",
	}
	db.Model(&Disease{}).Create(&disease2)

	disease3 := Disease{
		Name: "ไข้เลือดออก",
	}
	db.Model(&Disease{}).Create(&disease3)

	disease4 := Disease{
		Name: "ไข้ หรือ ไข้ไม่ทราบสาเหตุ",
	}
	db.Model(&Disease{}).Create(&disease4)

	disease5 := Disease{
		Name: "ติดเชื้อระบบทางเดินอาหารจากแบคทีเรียชนิดเฉียบพลัน",
	}
	db.Model(&Disease{}).Create(&disease5)

	disease6 := Disease{
		Name: "ทางเดินอาหารอักเสบเฉียบพลันจากไวรัส",
	}
	db.Model(&Disease{}).Create(&disease6)

	disease7 := Disease{
		Name: "พิษจากยารักษาโรค",
	}
	db.Model(&Disease{}).Create(&disease7)

	disease8 := Disease{
		Name: "พิษสุนัขบ้า",
	}
	db.Model(&Disease{}).Create(&disease8)

	disease9 := Disease{
		Name: "พิษจากแก๊ส สารไอระเหย",
	}
	db.Model(&Disease{}).Create(&disease9)

	disease10 := Disease{
		Name: "โรคตาแดง โรคตาอักเสบ",
	}
	db.Model(&Disease{}).Create(&disease10)

	disease11 := Disease{
		Name: "โรคเบาหวาน",
	}
	db.Model(&Disease{}).Create(&disease11)

	disease12 := Disease{
		Name: "โรคเพศสัมพันธุ์อื่น ๆ",
	}
	db.Model(&Disease{}).Create(&disease12)

	disease13 := Disease{
		Name: "โรคภูมิแพ้",
	}
	db.Model(&Disease{}).Create(&disease13)

	disease14 := Disease{
		Name: "อาหารเป็นพิษ",
	}
	db.Model(&Disease{}).Create(&disease14)

	//=================Medicine Data====================
	db.Model(&Medicine{}).Create(&Medicine{
		Name:        "ไม่มี",
		Description: "none",
		Price:       0,
	})

	medicine1 := Medicine{
		Name:        "ยาแก้ไข้",
		Description: "บรรเทาอาการปวดลดไข้",
		Price:       120.00,
	}
	db.Model(&Medicine{}).Create(&medicine1)

	db.Model(&Medicine{}).Create(&Medicine{
		Name:        "Metformin",
		Description: "ยารักษาโรคเบาหวาน",
		Price:       300.00,
	})

	db.Model(&Medicine{}).Create(&Medicine{
		Name:        "Clarityne",
		Description: "ยาบรรเทาอาการแพ้ระบบทางเดินหายใจ",
		Price:       200.00,
	})

	db.Model(&Medicine{}).Create(&Medicine{
		Name:        "Antacil Gel",
		Description: "ยาบรรเทาอาการ แสบร้อนกลางอกเนื่องจากกรดไหลย้อน ลดกรด ลดแก๊ส เคลือบแผลในกระเพาะอาหาร ปวดท้อง ท้องอืด จุกเสียด แน่น อาหารไม่ย่อย",
		Price:       65.00,
	})

	db.Model(&Medicine{}).Create(&Medicine{
		Name:        "Omepazole",
		Description: "เป็นยารักษาโรคกรดไหลย้อน โรคแผลเปื่อยเพปติก/แผลในกระเพาะอาหาร ",
		Price:       275.50,
	})
	db.Model(&Medicine{}).Create(&Medicine{
		Name:        "Ibupofen",
		Description: "บรรเทาอาการปวดประจำเดือน",
		Price:       125.45,
	})

	//=================OutpatientScreening Data====================
	//EmergencyLevel Data
	EmergencyLevel1 := EmergencyLevel{
		Level:           "ภาวะฉุกเฉิน",
		AssessmentForms: "ESI-2 วิกฤต (Emergency) : SBP มีค่าต่ำกว่าที่ระบุ + ผิวซีดและผิวหนังเย็น, ผิวลายเป็นจ้ำๆ",
		procedure:       "แจ้งพยาบาล-แพทย์",
	}
	db.Model(&EmergencyLevel{}).Create(&EmergencyLevel1)

	EmergencyLevel2 := EmergencyLevel{
		Level:           "ภาวะเร่งด่วน",
		AssessmentForms: "ESI-3 เร่งด่วน (Urgency): HR, RR, Temp มากกว่าที่ระบุ, O2Sat < 92 %",
		procedure:       "แจ้งพยาบาล-แพทย์",
	}
	db.Model(&EmergencyLevel{}).Create(&EmergencyLevel2)

	EmergencyLevel3 := EmergencyLevel{
		Level:           "ภาวะไม่รุนแรง",
		AssessmentForms: "ESI-4  ไม่รุนแรง (Semi-Urgency): Temp มากกว่าที่ระบุ",
		procedure:       "จัดลำดับในการเข้าตรวจ",
	}
	db.Model(&EmergencyLevel{}).Create(&EmergencyLevel3)

	// HighBloodPressureLevel Data
	HighBloodPressureLevel1 := HighBloodPressureLevel{
		Level:           "กลุ่มป่วย",
		AssessmentForms: "SBP = 140 - 179 และ DBP = 90 - 109 มม.ปรอท",
	}
	db.Model(&HighBloodPressureLevel{}).Create(&HighBloodPressureLevel1)

	HighBloodPressureLevel2 := HighBloodPressureLevel{
		Level:           "กลุ่มเสี่ยง",
		AssessmentForms: "SBP = 120 - 139 และ DBP = 80 - 89 มม.ปรอท",
	}
	db.Model(&HighBloodPressureLevel{}).Create(&HighBloodPressureLevel2)

	HighBloodPressureLevel3 := HighBloodPressureLevel{
		Level:           "กลุ่มปกติ",
		AssessmentForms: "SBP < 120 และ DBP < 80 มม.ปรอท",
	}
	db.Model(&HighBloodPressureLevel{}).Create(&HighBloodPressureLevel3)

	// DiabetesLevel Data
	DiabetesLevel1 := DiabetesLevel{
		Level:                     "กลุ่มเสี่ยงสูงมาก",
		DiabetesAssessmentForms:   "Diabetes risk score มากกว่า 8",
		DiabetesHistoryTakingForm: "Text Field",
	}
	db.Model(&DiabetesLevel{}).Create(&DiabetesLevel1)

	DiabetesLevel2 := DiabetesLevel{
		Level:                     "กลุ่มเสี่ยงสูง",
		DiabetesAssessmentForms:   "Diabetes risk score 6-8 คะแนน",
		DiabetesHistoryTakingForm: "Text Field",
	}
	db.Model(&DiabetesLevel{}).Create(&DiabetesLevel2)

	DiabetesLevel3 := DiabetesLevel{
		Level:                     "กลุ่มเสี่ยงปานกลาง",
		DiabetesAssessmentForms:   "Diabetes risk score 3-5 คะแนน",
		DiabetesHistoryTakingForm: "Text Field",
	}
	db.Model(&DiabetesLevel{}).Create(&DiabetesLevel3)

	DiabetesLevel4 := DiabetesLevel{
		Level:                     "กลุ่มปกติ",
		DiabetesAssessmentForms:   "Diabetes risk score น้อยกว่า 3 คะแนน",
		DiabetesHistoryTakingForm: "Text Field",
	}
	db.Model(&DiabetesLevel{}).Create(&DiabetesLevel4)

	// ObesityLevel Data
	ObesityLevel1 := ObesityLevel{
		Level:                    "กลุ่มผิดปกติ",
		ObesityAssessmentForms:   "BMI > 35, มีความผิดปกติมากกว่าเท่ากับ 3 ข้อจาก 5 ข้อในการซักประวัติ",
		ObesityHistoryTakingForm: "Text Field",
	}
	db.Model(&ObesityLevel{}).Create(&ObesityLevel1)

	ObesityLevel2 := ObesityLevel{
		Level:                    "กลุ่มปกติ",
		ObesityAssessmentForms:   "BMI < 35, มีความผิดปกติน้อยกว่า 3 ข้อจาก 5 ข้อในการซักประวัติ",
		ObesityHistoryTakingForm: "Text Field",
	}
	db.Model(&ObesityLevel{}).Create(&ObesityLevel2)

	//==============================================
	// medicinerecord1 := MedicineRecord{
	// 	Pharmacist:      Employee2,
	// 	TreatmentRecord: treatmentrecord1,

	// 	StatusMed:  statusmed1,
	// 	Advicetext: "none",

	// 	// MedicinePrice: 100,
	// 	MedTime: time.Now(),
	// }
	// db.Model(&MedicineRecord{}).Create(&medicinerecord1)

	payment1 := PaymentType{
		Type: "เงินสด",
	}
	db.Model(&PaymentType{}).Create(&payment1)

	payment2 := PaymentType{
		Type: "Mobile Banking",
	}
	db.Model(&PaymentType{}).Create(&payment2)

	payment3 := PaymentType{
		Type: "eWallet",
	}
	db.Model(&PaymentType{}).Create(&payment3)
	payment4 := PaymentType{
		Type: "บัตรเครดิต",
	}
	db.Model(&PaymentType{}).Create(&payment4)

	statusmed1 := StatusMed{
		Number: 1,
		Status: "การจ่ายยาครั้งที่1",
	}
	db.Model(&StatusMed{}).Create(&statusmed1)
	statusmed2 := StatusMed{
		Number: 2,
		Status: "การจ่ายยาครั้งที่2",
	}
	db.Model(&StatusMed{}).Create(&statusmed2)

	statusmed3 := StatusMed{
		Number: 3,
		Status: "การจ่ายยาครั้งที่3",
	}
	db.Model(&StatusMed{}).Create(&statusmed3)
	statusmed4 := StatusMed{
		Number: 4,
		Status: "การจ่ายยาครั้งที่4",
	}
	db.Model(&StatusMed{}).Create(&statusmed4)

	GetDistrictList(db)
	GetNationalityList(db)
	GetProvinceList(db)
	GetSubDistrictList(db)

}
func GetProvinceList(db *gorm.DB) {
	resp, err := http.Get("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json")
	if err != nil {
		panic(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// println(string(body))
	var provinceResp []struct {
		ID     uint   `json:"id"`
		NameTH string `json:"name_th"`
		NameEN string `json:"name_en"`
	}
	json.Unmarshal(body, &provinceResp)

	var newProvince []Province
	for _, province := range provinceResp {
		newProvince = append(newProvince, Province{
			Model: gorm.Model{ID: province.ID},
			Name:  fmt.Sprintf("%s/%s", province.NameTH, province.NameEN),
		})
	}
	db.Model(&Province{}).Create(&newProvince)

}

func GetDistrictList(db *gorm.DB) {
	resp, err := http.Get("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json")
	if err != nil {
		panic(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// println(string(body))
	var districtResp []struct {
		ID         uint   `json:"id"`
		NameTH     string `json:"name_th"`
		NameEN     string `json:"name_en"`
		ProvinceID uint   `json:"province_id"`
	}
	json.Unmarshal(body, &districtResp)

	var newDistrict []District
	for _, district := range districtResp {
		newDistrict = append(newDistrict, District{
			Model:      gorm.Model{ID: district.ID},
			Name:       fmt.Sprintf("%s/%s", district.NameTH, district.NameEN),
			ProvinceID: district.ProvinceID,
		})
	}
	db.Model(&District{}).Create(&newDistrict)
}

func GetSubDistrictList(db *gorm.DB) {
	resp, err := http.Get("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json")
	if err != nil {
		panic(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// println(string(body))
	var subDistrictResp []struct {
		ID         uint   `json:"id"`
		NameTH     string `json:"name_th"`
		NameEN     string `json:"name_en"`
		DistrictID uint   `json:"amphure_id"`
		PostCode   uint   `json:"zip_code"`
	}
	json.Unmarshal(body, &subDistrictResp)

	// var newSubDistrict []SubDistrict
	for _, subDistrict := range subDistrictResp {
		newSubDistrict := SubDistrict{
			Model:      gorm.Model{ID: subDistrict.ID},
			Name:       fmt.Sprintf("%s/%s", subDistrict.NameTH, subDistrict.NameEN),
			DistrictID: subDistrict.DistrictID,
			PostCode:   subDistrict.PostCode,
		}
		db.Model(&SubDistrict{}).Create(&newSubDistrict)
	}

}

func GetNationalityList(db *gorm.DB) {
	resp, err := http.Get("https://raw.githubusercontent.com/ponlawat-w/country-list-th/master/country-list-th.json")
	if err != nil {
		panic(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// println(string(body))
	var nationalityResp []struct {
		ID     uint   `json:"id"`
		NameTH string `json:"name"`
		NameEN string `json:"enName"`
	}
	json.Unmarshal(body, &nationalityResp)

	var newNationality []Nationality
	for _, nationality := range nationalityResp {
		newNationality = append(newNationality, Nationality{
			Model: gorm.Model{ID: nationality.ID},
			Name:  fmt.Sprintf("%s/%s", nationality.NameTH, nationality.NameEN),
		})
	}
	db.Model(&Nationality{}).Create(&newNationality)
}
