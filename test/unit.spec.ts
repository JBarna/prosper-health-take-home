
import { findSlotPairs } from '../src/schedule'
import { clinicianIndex } from '../src/data/mock-clinician'
import { AvailableAppointmentSlot, nonPresentableReasons } from '../src/types/appointment'
import optimalTimes from '../src/optimize'
import { checkLimitsForClinician } from '../src/clinician'

describe("task 1", () => {
  it("should work as described in the document", () => {
    const slots = [
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
        "date": "2024-08-21T12:00:00.000Z"
      },
      {
        "length": 90,
        "date": "2024-08-21T15:00:00.000Z"
      },
      {
        "length": 90,
        "date": "2024-08-22T15:00:00.000Z"
      },
      {
        "length": 90,
        "date": "2024-08-28T12:15:00.000Z"
      }
    ]

    clinicianIndex.jane.availableSlots = slots.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true }))
    const results = findSlotPairs([clinicianIndex.jane]).jane

    const expectedResults = [
      ["2024-08-19T12:00:00.000Z", "2024-08-21T12:00:00.000Z"],
      ["2024-08-19T12:00:00.000Z", "2024-08-21T15:00:00.000Z"],
      ["2024-08-19T12:00:00.000Z", "2024-08-22T15:00:00.000Z"],
      ["2024-08-19T12:15:00.000Z", "2024-08-21T12:00:00.000Z"],
      ["2024-08-19T12:15:00.000Z", "2024-08-21T15:00:00.000Z"],
      ["2024-08-19T12:15:00.000Z", "2024-08-22T15:00:00.000Z"],
      ["2024-08-21T12:00:00.000Z", "2024-08-22T15:00:00.000Z"],
      ["2024-08-21T12:00:00.000Z", "2024-08-28T12:15:00.000Z"],
      ["2024-08-21T15:00:00.000Z", "2024-08-22T15:00:00.000Z"],
      ["2024-08-21T15:00:00.000Z", "2024-08-28T12:15:00.000Z"],
      ["2024-08-22T15:00:00.000Z", "2024-08-28T12:15:00.000Z"]
    ]

    expect(results).toHaveLength(expectedResults.length)
    results.forEach((pair, idx) => {
      const [firstDate, secondDate] = pair
      expect(expectedResults[idx][0]).toBe(firstDate)
      expect(expectedResults[idx][1]).toBe(secondDate)
    })
  })
})

describe("task 2", () => {
  it("should work as described in the document", () => {
    let rawSlots = [
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
    ]

    const slots: AvailableAppointmentSlot[] = rawSlots.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true }))

    optimalTimes(slots, 90)

    const expectedResults = ["2024-08-19T12:00:00.000Z", "2024-08-19T13:30:00.000Z"]

    const presentableSlots = slots.filter(slot => slot.presentable)

    expect(presentableSlots).toHaveLength(expectedResults.length)

    presentableSlots.forEach(slot => {
      if (!expectedResults.includes(slot.date.toISOString())) {
        fail(`date of slot ${slot.date.toISOString()} should not be presentable`)
      }
    })
  })

  it("should include overlapping slots if they maintain the same optimal number of appointments", () => {
    let rawSlots = [
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
    ]

    const slots: AvailableAppointmentSlot[] = rawSlots.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true }))

    optimalTimes(slots, 90)

    const expectedResults = ["2024-08-19T12:00:00.000Z", "2024-08-19T12:15:00.000Z", "2024-08-19T13:30:00.000Z", "2024-08-19T13:45:00.000Z"]

    const presentableSlots = slots.filter(slot => slot.presentable)

    expect(presentableSlots).toHaveLength(expectedResults.length)

    presentableSlots.forEach(slot => {
      if (!expectedResults.includes(slot.date.toISOString())) {
        fail(`date of slot ${slot.date.toISOString()} should not be presentable`)
      }
    })
  })

  it("should handle slots that are separated by a time greater than the duration", () => {
    let rawSlots = [
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

    const slots: AvailableAppointmentSlot[] = rawSlots.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true }))

    optimalTimes(slots, 90)

    const expectedResults = ["2024-08-19T12:00:00.000Z", "2024-08-19T12:15:00.000Z", "2024-08-19T13:30:00.000Z", "2024-08-19T13:45:00.000Z", "2024-08-20T12:00:00.000Z", "2024-08-20T13:30:00.000Z"]

    const presentableSlots = slots.filter(slot => slot.presentable)

    expect(presentableSlots).toHaveLength(expectedResults.length)

    presentableSlots.forEach(slot => {
      if (!expectedResults.includes(slot.date.toISOString())) {
        fail(`date of slot ${slot.date.toISOString()} should not be presentable`)
      }
    })
  })
})

describe("task3", () => {
  let checkLimits: any;

  beforeEach(() => {
    checkLimits = checkLimitsForClinician(clinicianIndex.jane)
  })

  it("should verify daily limits", () => {
    clinicianIndex.jane.maxDailyAppointments = 1
    clinicianIndex.jane.appointments = [{
      scheduledFor: new Date("2024-08-22T15:00:00.000Z")
    }]

    const invalidAppt: AvailableAppointmentSlot = {
      date: new Date("2024-08-22T18:00:00.000Z"),
      presentable: true,
      length: 90
    }

    // next day appt
    const validAppt: AvailableAppointmentSlot = {
      date: new Date("2024-08-23T18:00:00.000Z"),
      presentable: true,
      length: 90
    }

    checkLimits(invalidAppt)
    checkLimits(validAppt)

    expect(invalidAppt.presentable).toBeFalsy()
    expect(invalidAppt.nonPresentableReason).toBe(nonPresentableReasons[1])
    expect(validAppt.presentable).toBeTruthy()
    expect(validAppt.nonPresentableReason).not.toBeDefined()
  })

  it("should verify weekly limits", () => {
    clinicianIndex.jane.maxWeeklyAppointments = 1

    // 18th is the sunday of this week
    clinicianIndex.jane.appointments = [{
      scheduledFor: new Date("2024-08-22T15:00:00.000Z")
    }]

    const invalidAppts: AvailableAppointmentSlot[] = [
      { // starting sunday
        date: new Date("2024-08-18T18:00:00.000Z"),
        presentable: true,
        length: 90
      },
      { // wednesday
        date: new Date("2024-08-21T18:00:00.000Z"),
        presentable: true,
        length: 90
      },
      { // saturday
        date: new Date("2024-08-24T18:00:00.000Z"),
        presentable: true,
        length: 90
      }
    ]

    const validAppts: AvailableAppointmentSlot[] = [
      { // saturday before
        date: new Date("2024-08-17T18:00:00.000Z"),
        presentable: true,
        length: 90
      },
      { // sunday after
        date: new Date("2024-08-25T18:00:00.000Z"),
        presentable: true,
        length: 90
      }
    ];

    [invalidAppts, validAppts].flat().forEach(checkLimits)

    for (const appt of invalidAppts) {
      expect(appt.presentable).toBeFalsy()
      expect(appt.nonPresentableReason).toBe(nonPresentableReasons[0])
    }

    for (const appt of validAppts) {
      expect(appt.presentable).toBeTruthy()
      expect(appt.nonPresentableReason).not.toBeDefined()
    }
  })
})