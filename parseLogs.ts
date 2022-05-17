// Imports
const fs = require('fs')

interface Log {
    id: string,
    email: string,
    message: string,
}

interface Tally {
    email: string,
    count: number,
}

interface LogCounter {
    [ key: string ]: number,
}

interface Message {
    logs_id: string,
    tally: Tally[],
}

interface LogFile {
    logs: Log[],
    id: string,
}

// Declare global variables
function Main(): void {
    const globalLogsByUser = {} as LogCounter
    const globalTally = [] as Tally[]
    const allMessages = [] as Message[]

    // Read in all files in the logs folder
    const logFileNames: string[] = fs.readdirSync('./logs')

    // Loop through each file to parse it
    logFileNames.forEach((fileName, i) => {
        //File Scope Variables
        const fileContents: string = fs.readFileSync(`./logs/${fileName}`, 'utf8')
        const parsedFile: LogFile = JSON.parse(fileContents)
        const {logs, id} = parsedFile
        const fileLogsByUser: LogCounter = {}
        const printMessage: Message = {
            logs_id: id,
            tally: [],
        }

        logs.forEach(log => {
            // Individual Log Scope Variables
            const {email} = log
            //Check if email exists in local counter. If not, create it.
            if (!fileLogsByUser[ email ]) {
                fileLogsByUser[ email ] = 0
            }
            //Increment the counter for the email
            fileLogsByUser[ email ] += 1
        });

        // Generate the print message for the file
        for (let email in fileLogsByUser) {
            const t: Tally = {
                email,
                count: fileLogsByUser[ email ]
            }
            printMessage.tally.push(t)
        }

        // Update the global counters using the totals from the file
        printMessage.tally.forEach(({email, count}) => {
            if (!globalLogsByUser[ email ]) {
                globalLogsByUser[ email ] = 0
            }
            globalLogsByUser[ email ] += count
        })

        // Add the print message to the global array
        allMessages.push(printMessage)

    })

    // After all files have been parsed, generate the global Tally List

    for (let email in globalLogsByUser) {
        const t: Tally = {
            email,
            count: globalLogsByUser[ email ]
        }
        globalTally.push(t)
    }

    // Write the results to the output file
    fs.writeFileSync('output.json', JSON.stringify({allMessages, globalTally}))
}

Main()