package entity

import (
  "golang.org/x/crypto/bcrypt"
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
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
	)

  db = database
  //ผู้ดูแลระบบ
  PasswordAdmin1, err := bcrypt.GenerateFromPassword([]byte("123456789"), 14)
	Admin1 := Admin{
		FirstName:  "พิมพ์ชนก",
		LastName:   "โสมศรี",
		Email:      "pimchanok@gmail.com",
		Password:    string(PasswordAdmin1),
	}
  db.Model(&Admin{}).Create(&Admin1)

  PasswordAdmin2, err := bcrypt.GenerateFromPassword([]byte("111111111"), 14)
	Admin2 := Admin{
		FirstName:  "ศิริวรรณ",
		LastName:   "ประธาน",
		Email:      "sp@gmail.com",
		Password:    string(PasswordAdmin2),
	}
  db.Model(&Admin{}).Create(&Admin2)

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

 }

 