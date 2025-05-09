# Prosper Take-home assignment: Joel

### Environment Setup
1. Download the repository
2. Ensure node.js is installed on the machine
3. Install dependencies `npm install`
4. Compile the project `npm run compile`

### Run Project
1. Execute `node ./dist > out.log` from the terminal
2. Review the program output in the log file `out.log`

Alternatively you can run in dev mode, `npm run dev`.

### Command Line Args
1. `DEBUG=1` - this will append output from the program that explains why certain appointment slots were invalided for each clinician
2. `PATIENT=<patient-id>` : Specify which patient you want to run the program against. Must be the ID of a mock-patient. Options are `byrne, joel`, defaults to `byrne`.


## Assumptions
1. The weekly limit for a clinician is interpreted as a calendar week as it begins on Sunday and goes to Saturday, rather than a rolling  stretch of 7 days that can begin on any day.
2. This program does not provide times for clinicians of type `THERAPIST` as that was not stated in the project description, although it would be straightforward to add that functionality. 