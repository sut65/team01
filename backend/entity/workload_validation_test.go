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

func TestDateNotbePastandFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []time.Time{
		time.Now().Add(24 * time.Hour),
		time.Now().Add(-24 * time.Hour),
	}

	for _, fixture := range fixtures {
		workload := &Workload{
			Date:      fixture,
			StartTime: time.Now().Add(1 * time.Hour),
			EndTime:   time.Now().Add(2 * time.Hour),
		}
		ok, err := govalidator.ValidateStruct(workload)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Date must be present"))
	}
}

func TestStartTimeMustbeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	workload := Workload{
		Date:      time.Now(),
		StartTime: time.Now().Add(-time.Hour),
		EndTime:   time.Now().Add(time.Hour),
	}

	ok, err := govalidator.ValidateStruct(workload)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err.Error).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Start Time must be future"))
}

func TestEndTimeMustbeFuture(t *testing.T) {

	g := NewGomegaWithT(t)

	workload := Workload{
		Date:      time.Now(),
		StartTime: time.Now().Add(time.Hour),
		EndTime:   time.Now().Add(-time.Hour),
	}

	ok, err := govalidator.ValidateStruct(workload)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err.Error()).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("End Time must be future"))
}
