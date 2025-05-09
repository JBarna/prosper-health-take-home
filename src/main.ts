import { clinicians } from './data/mock-clinician'
import { Patient } from './types/patient'
import optimalTimes from './optimize'
import { findSlotPairs } from './schedule'
import { applicableCliniciansForPatient, checkLimitsForClinician } from './clinician'

export default function main(patient: Patient) {

    for (const clinician of clinicians) {
        optimalTimes(clinician.availableSlots, 90) // task 2
        clinician.availableSlots.filter(slot => slot.presentable).forEach(checkLimitsForClinician(clinician)) // task 3
    }

    // task 1
    const cliniciansForPatient = applicableCliniciansForPatient(patient, "PSYCHOLOGIST")
    const slotPairsByClinician = findSlotPairs(cliniciansForPatient)

    return slotPairsByClinician
}