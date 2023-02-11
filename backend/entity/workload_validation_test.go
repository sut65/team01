package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestWorkloadPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	workload := &Workload{
		Date:      time.Now(),
		StartTime: time.Now().Add(1 * time.Hour),
		EndTime:   time.Now().Add(2 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(workload)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}