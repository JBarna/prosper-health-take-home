import { Patient } from "./types/patient"
import { clinicians, clinicianIndex } from './data/mock-clinician'
import slotData from './data/mock-slot-data'
import main from './main'
import { patientIndex } from "./data/mock-patient"


run()

function run() {
    const patient = setup()
    const slotPairsByClinician = main(patient)

    // output available pair appointments
    for (const clinicianId in slotPairsByClinician) {
        const {firstName, lastName } = clinicianIndex[clinicianId]
        console.log(`Available pair appointments for ${firstName} ${lastName}:`)
        slotPairsByClinician[clinicianId].forEach(pair => console.log(pair))
        console.log()
    }

    // set DEBUG=1 to view omitted times and their reasons
    if (process.env.DEBUG) {
        console.log("DEBUG - omitted times")
        for (const clinician of clinicians) {
            console.log(`Appointment omissions for ${clinician.firstName}:`)
            for (const omittedSlot of clinician.availableSlots.filter(slot => !slot.presentable)) {
                console.log(`${omittedSlot.date.toISOString()} - ${omittedSlot.nonPresentableReason}`)
            }
            console.log()
        }
    }
}

function setup(): Patient {

    // load slot data into clinicians
    // jane gets even dates, joes odd dates
    clinicianIndex.jane.availableSlots = slotData.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true}))
        .filter(slot => !(slot.date.getUTCDate() % 2))

    clinicianIndex.john.availableSlots = slotData.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true}))
        .filter(slot => slot.date.getUTCDate() % 2)

    // load patient
    const patientId = process.env.PATIENT || "byrne"

    if (!(patientId in patientIndex)) {
        console.error('Provided patient id must match a defined mock patient id')
        process.exit(1)
    }

    return patientIndex[patientId]
}