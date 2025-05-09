# Prosper Take-home assignment: Joel

### Environment Setup
1. Download the repository
2. Ensure node.js is insalled on the machine
3. Install dependencies `npm install`
4. compile the project `npm run compile`

### Run Project
1. execute `node ./dist/index > out.log` from the terminal
2. Review the program output in the log file `out.log`

Alternatively you can run in dev mode, `npm run dev`.

### Command Line Args
1. `DEBUG=1` - this will append output from the program that explains why certain appointment slots were invalided for each clinician
2. `PATIENT=<patient-id>` : Specify which patient you want to run the program against. Must be the ID of a mock-patient. Options are `byrne, joel`, defaults to `byrne`.