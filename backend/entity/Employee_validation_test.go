package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

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