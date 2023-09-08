import * as SMS from 'expo-sms'

import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'


const CAPTAIN_CELL = '0824624897'

export const sendConfirmStatusSMS = async (confirmationStatus, gameInfo) => {
    const gameDescription = gameInfo.title + '\n' + gameInfo.date + '\n' + gameInfo.course

    let textMessage = ''
    confirmationStatus 
    ? textMessage = 'Successfully CONFIRMED attendance to : \n' +  gameDescription
    : textMessage = 'Successfully CANCELLED attendance to : \n' + gameDescription

    if (await SMS.isAvailableAsync()) {
        const {result} = await SMS.sendSMSAsync(
            ['0824624897'],
            textMessage,
        )
        console.log('sendSMSAsync() result: ', result)
    } else {
        console.log('SMS service unavailable!!!')
    }
}

export const sendConfirmationsList = async (gameInfo, confirmationsList) => {
    // for creation of a pdf file, the following needs to be installed
    // 1. expo install expo-print expo-sharing

    var table = ''
    let counter = 0
    for (let i in confirmationsList) {
        const golfer = confirmationsList[i]
        counter++
        table = table + `<tr><td>${counter}. ${golfer.firstName} ${golfer.lastName}</td></tr>`
    }
    //console.log('\n    Table', table)

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
            </head>

            <style>
                table { width: 100%; border-collapse: collapse; }
                td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; }
                tr:nth-child(even) { background-color: #dddddd; }
            </style>
            <body>  
                <h2 style="width: 100%; text-transform: uppercase; text-align: center;">${gameInfo.title}</h1>
                <h3 style="text-align: center;">${gameInfo.date}  @${gameInfo.teeOff}</h3>
                <h3 style="text-align: center;">${gameInfo.course}</h3>
                <p>
                    <h3 style="text-transform: uppercase; text-align: center">Confirmations</h3>
                    <table> ${table} </table>
                </p>
            </body>
        </html>
    `;
    // console.log('\n    HTML', html)
    const file = await printToFileAsync({
        html: html,
        base64: false,
    })
    await shareAsync(file.uri)
}