import program from '../src/main'
import { patientIndex } from '../src/data/mock-patient'
import { clinicians } from '../src/data/mock-clinician'
import largeDataSlots from '../src/data/mock-slot-data'
import { Patient } from '../src/types/patient'

const smallDataSlots = [
    {
      "length": 90,
      "date": "2024-08-19T12:00:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-19T12:15:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-19T12:30:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-19T12:45:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-19T13:00:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-19T13:15:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-19T13:30:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-19T13:45:00.000Z"
    },

    // next day

    {
      "length": 90,
      "date": "2024-08-20T12:00:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-20T12:15:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-20T12:30:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-20T12:45:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-20T13:00:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-20T13:15:00.000Z"
    },
    {
      "length": 90,
      "date": "2024-08-20T13:30:00.000Z"
    },
  ]

function verifyResults(results: Record<string, string[][]>, originalSlots: any[]) {
    for (const pairs of Object.values(results)) {
        expect(pairs).toBeInstanceOf(Array)
        expect(pairs.length).toBeGreaterThan(0)
        for (const pair of pairs) {
            expect(pair).toHaveLength(2)
            for (const date of pair) {
                // verify the date existed in the original set of data
                if (!originalSlots.find(slot => slot.date === date)) {
                    fail(`date of ${date} was returned by the program but was not in the original list`)
                }
            }
        }
    }
}

describe('integration tests', () => {
    let patient: Patient
    beforeAll(() => {
        patient = patientIndex.byrne
    })

    it("handles small data slots", () => {
        for (const clinician of clinicians) {
            // load slots and assign to each clinician
            clinician.availableSlots = smallDataSlots.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true}))
        }

        const results = program(patient)
        verifyResults(results, smallDataSlots)
    })

    it("handles large data slots", () => {
        for (const clinician of clinicians) {
            // load slots and assign to each clinician
            clinician.availableSlots = largeDataSlots.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true}))
        }

        const results = program(patient)
        verifyResults(results, largeDataSlots)
    })
})