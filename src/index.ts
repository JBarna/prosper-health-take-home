import { Patient } from "./types/patient"
import { clinicians } from './data/mock-clinician'
import slotData from './data/mock-slot-data'
import main from './main'
import { patientIndex } from "./data/mock-patient"


run()

function run() {
    const patient = setup()
    const slotPairsByClinician = main(patient)

    for (const clinician in slotPairsByClinician) {
        console.log(`Available pair appointments for ${clinician}:`)
        slotPairsByClinician[clinician].forEach(pair => console.log(pair))
        console.log()
    }

    // set DEBUG=1 to view omitted times and their reasons
    if (process.env.DEBUG) {
        console.log("DEBUG - omitted times")
        const omittedTimes = clinicians.reduce((acc: any, clinician) => (acc[clinician.id] = 
                clinician.availableSlots.filter(slot => !slot.presentable).map(({date, nonPresentableReason}) => ({ date, nonPresentableReason})))
            && acc, {})

        for (const clinician in omittedTimes) {
            console.log(`Appointment omissions for ${clinician}:`)
            omittedTimes[clinician].forEach((appt: any) => console.log(`${appt.date.toISOString()} - ${appt.nonPresentableReason}`))
            console.log()
        }
    }
}

function setup(): Patient {

    // load slot data into clinicians
    for (const clinician of clinicians) {
        // load slots and assign to each clinician
        clinician.availableSlots = slotData.map(slot => ({ ...slot, date: new Date(slot.date), presentable: true}))
    }

    // load patient
    const patientId = process.env.PATIENT || "byrne"

    if (!(patientId in patientIndex)) {
        console.error('Provided patient id must match a defined mock patient id')
        process.exit(1)
    }

    return patientIndex[patientId]
}