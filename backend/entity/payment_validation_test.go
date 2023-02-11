package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPaymentNow(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	payment := Payment{
		PaymentTime: time.Now(),
		Total:       100,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)
	fmt.Printf("%v\n", err)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

// ตรวจสอบค่าว่างของTotalแล้วต้องเจอ Error
func TestTotalNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	fixture := []uint{
		11223, 23453,
	}
	for _, amount := range fixture {
		payment := Payment{
			PaymentTime: time.Now(),
			Total:       amount, // ผิด
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(payment)
		fmt.Printf("%v\n", err)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Total cannot be zero"))
	}

}
