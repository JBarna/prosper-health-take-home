import { Clinician } from "./types/clinician"
import { cloneWithoutTime } from "./date-utils"

export function findSlotPairs(clinicians: Clinician[]) {
    const results: Record<string, string[][]> = {}
    for (const clinician of clinicians) {
        const appointmentPairs: string[][] = []

        const presentableSlots = clinician.availableSlots.filter(slot => slot.presentable)

        presentableSlots.forEach((slot, idx) => {
            const maxDate = cloneWithoutTime(slot.date)

            // since we're starting from the beginning of this date,
            // need to add an extra just to start from the next day
            maxDate.setUTCDate(maxDate.getUTCDate() + 8) 

            for (const nextSlot of presentableSlots.slice(idx + 1)) {
                if (nextSlot.date.getUTCDate() !== slot.date.getUTCDate() && nextSlot.date < maxDate ) {
                    appointmentPairs.push([slot.date.toISOString(), nextSlot.date.toISOString()])
                }
            }
        })
        results[clinician.id] = appointmentPairs
    }
    return results
}