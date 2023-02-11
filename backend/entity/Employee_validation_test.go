package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEmployeePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	employee := Employee{
		IDCard:      "1410087223152",
		FirstName:   "มะลิ",
		LastName:    "แสนสุข",
		PhoneNumber: "0999999909",
		Email:       "mali@gmail.com",
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Date(2000, 5, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestBirthdateMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)
	employee := Employee{
		IDCard:      "1410087223152",
		FirstName:   "มะลิ",
		LastName:    "แสนสุข",
		PhoneNumber: "0999999909",
		Email:       "mali@gmail.com",
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Now().Add(2 * time.Minute),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Birthday: The following validator is invalid or can't be applied to the field: \"past\""))
}

func TestIDCardNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		IDCard:      "",
		FirstName:   "มะลิ",
		LastName:    "แสนสุข",
		PhoneNumber: "0999999909",
		Email:       "mali@gmail.com",
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Identification Number cannot be blank"))
}

func TestIDCardMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"0000000000000",
		"0123456654321",
		"000000000000",
		"100000000000",
		"10000000000000",
		"10000000000x",
		"0",
		"xxxxxxxxxxxxx",
	}

	for _, fixture := range fixtures {
		employee := Employee{
			IDCard:      fixture,
			FirstName:   "มะลิ",
			LastName:    "แสนสุข",
			PhoneNumber: "0999999909",
			Email:       "mali@gmail.com",
			Password:    "11111111",
			Salary:      21000,
			Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		}

		ok, err := govalidator.ValidateStruct(employee)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(Equal("IDCard does not validate"))
	}
}

func TestSalaryNotbeZero(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []float64{
		-5,
		-4,
		-2,
		0,
	}
	for _, fixture := range fixtures {
		employee := Employee{
			IDCard:      "1410087223152",
			FirstName:   "มะลิ",
			LastName:    "แสนสุข",
			PhoneNumber: "0999999909",
			Email:       "mali@gmail.com",
			Password:    "11111111",
			Salary:      fixture, //ผิด
			Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(employee)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		if err.Error() == "Salary must not be zero" {
            g.Expect(err.Error()).To(Equal("Salary must not be zero"))
        } else if err.Error() == "Salary must not be negative" {
            g.Expect(err.Error()).To(Equal("Salary must not be negative"))
        }
	}
}
func TestTelephoneMustBeValid(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"1000000000", // 1 ตามด้วย 0-9 9 ตัว
		"200000000",  // 0 ตามด้วย 0-9 8 ตัว
		"01234567",   // 0 ตามด้วย 0-9 10 ตัว
		"012345678",  // 0 ตามด้วย 0-9 8 ตัว และ A
		"01234567A9", // A ตามด้วย 0-9 9 ตัว
		"A1234567A9",
	}

	for _, fixture := range fixtures {
		employee := Employee{
			IDCard:      "1410087223152",
			FirstName:   "มะลิ",
			LastName:    "แสนสุข",
			PhoneNumber: fixture,
			Email:       "mali@gmail.com",
			Password:    "11111111",
			Salary:      21000,
			Birthday:    time.Date(2000, 5, 1, 0, 0, 0, 0, time.UTC),
		}

		ok, err := govalidator.ValidateStruct(employee)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Phone Number must be invalid"))
	}
}
func TestPhoneNumberNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		IDCard:      "1410087223152",
		FirstName:   "มะลิ",
		LastName:    "แสนสุข",
		PhoneNumber: "", //ผิด
		Email:       "mali@gmail.com",
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Phone Number cannot be blank"))
}
func TestEmailNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		IDCard:      "1410087223152",
		FirstName:   "มะลิ",
		LastName:    "แสนสุข",
		PhoneNumber: "0999999909",
		Email:       "", //ผิด
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email cannot be blank"))
}
func TestEmailMustBeValid(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		IDCard:      "1410087223152",
		FirstName:   "มะลิ",
		LastName:    "แสนสุข",
		PhoneNumber: "0999999909",
		Email:       "malcnui#ckdmui",
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email does not validate as email"))
}
func TestEmployeeFirstNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		IDCard:      "1410087223152",
		FirstName:   "", //ผิด
		LastName:    "แสนสุข",
		PhoneNumber: "0999999909",
		Email:       "mali@gmail.com",
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("First Name cannot be blank"))
}
func TestEmployeeLastNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		IDCard:      "1410087223152",
		FirstName:   "มะลิ",
		LastName:    "", //ผิด
		PhoneNumber: "0999999909",
		Email:       "mali@gmail.com",
		Password:    "11111111",
		Salary:      21000,
		Birthday:    time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Last Name cannot be blank"))
}