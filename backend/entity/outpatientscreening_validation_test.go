package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestOutpatientScreeningNote(t *testing.T) {
	g := NewGomegaWithT(t)

	outpatientScreening := OutpatientScreening{
		Note: "", //ผิดต้องไม่เป็นข้อมูล
		//DateRecord:	time.Now(),
	}

	//ตรวจสอบ govalidator
	ok, err := govalidator.ValidateStruct(outpatientScreening)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Note cannot be blank"))
}
