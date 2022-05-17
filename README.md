# Explaination

## General Notes

You will be able to see that I have leveraged strong typing in my code. Interfaces can be found at the top of the file. 

Explanations of what I'm doing and good notes have been included in the code as well.

## Running The "parseLogs.ts"

To run my code I am using ts-node

Please use the command `npm run parse parseLogs.ts`

## output.json

This is where I wrote the results rather than printing them to the console. 

In the output.json file you will find both the output with the count of logs per email in each individual file as well as the globall count of total logs per email. There will be a JSON object shaped like this: 

```
{
    allMessages: [
        logs_id: <id here>,
        tally: [
            {
                email: <email here>,
                count: <number of logs for this email in the given log file>
            },
            ...
        ]
    ],
    ...
    ,
    globalTally: [
        {
            email: <email here>,
            count: <number of logs for this email in all log files>
        }
    ]
}
```

## Credits 

Completed By: Blake Lamb
Date Completed: 5/13/2022# typscript-logs-parser
