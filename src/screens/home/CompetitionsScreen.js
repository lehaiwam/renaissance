import React, { useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import * as MailComposer from 'expo-mail-composer'


import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'
import LoadingOverlay from '../../components/UI/LoadingOverlay'

const CompetitionsScreen = ({navigation}) => {
    const bgImage = require('../../images/login_background.jpeg')
    const [isChecking4Availability, setIsChecking4Availability] = useState(false)
    const [isAvailable, setIsAvailable] =  useState(false)
    const [yourName, setYourName] = useState('')
    const [yourCell, setYourCell] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
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
            <h3 style="text-align: center"; text-transform: uppercase;">Medal Contest</h3>
            <p>
                The is our flagship contest played over 8 games and use your six best scores.
                The player with the least score is our championship golfer for the year.
            </p>
        </body>
    </html>
    `

    const sendMail = () => {

    }
    const resetForm = () => {
        
    }

    return (
        <View style={styles.mainContainer}>

        <ImageBackground style={styles.bgImage} source={ bgImage }>

            <Text style={styles.mainHeader}>RGC Competitions</Text>

            <View style={styles.container} >
                

                <View style={styles.contestContainer}>
                    <Text style={styles.header}>Medal</Text>
                    <View style={styles.description}>

                        <Text style={styles.paragraph}>
                            This is the club's flagship contest of the year, also popularly known amongst members, as the Order Of Merit (OOM). 
                            As the name clearly states, its played in a MEDAL format. 
                            Over the year we play eight medal games and we use only the golfer's best six scores to determine the winner.    
                        </Text>

                        <Text style={styles.paragraph}>
                            Note that a golfer is automatically out of contention if he has not played a minimum of 
                            six games required to permute the final score. The golfer with least score is declared our championship 
                            golfer of the year.  
                        </Text>

                    </View>
                    
                </View>

                <View style={styles.contestContainer}>
                    <Text style={styles.header} >Stableford</Text>
                    <View style={styles.description}>

                        <Text style={styles.paragraph}>
                            This is our flagship contest of the year. As the name clearly states, its played in a MEDAL format. 
                            Over the year we play eight medal games and we use only your best six scores to determine the winner.    
                        </Text>

                        <Text style={styles.paragraph}>
                            Note that a golfer is automatically out of contention if he has not played a minimum of 
                            six games required to permute the final score. The golfer with least score is declared our championship 
                            golfer of the year.  
                        </Text>

                    </View>
                    
                </View>

                <View style={styles.contestContainer}>
                    <Text style={styles.header} >Champ Of Champs</Text>
                    <View style={styles.description}>

                        <Text style={styles.paragraph}>
                            This is our flagship contest of the year. As the name clearly states, its played in a MEDAL format. 
                            Over the year we play eight medal games and we use only your best six scores to determine the winner.    
                        </Text>

                        <Text style={styles.paragraph}>
                            Note that a golfer is automatically out of contention if he has not played a minimum of 
                            six games required to permute the final score. The golfer with least score is declared our championship 
                            golfer of the year.  
                        </Text>

                    </View>
                    
                </View>

                <View style={styles.contestContainer}>
                    <Text style={styles.header} >Tubs Monareng Memorial</Text>
                    <View style={styles.description}>

                        <Text style={styles.paragraph}>
                            This is our flagship contest of the year. As the name clearly states, its played in a MEDAL format. 
                            Over the year we play eight medal games and we use only your best six scores to determine the winner.    
                        </Text>

                        <Text style={styles.paragraph}>
                            Note that a golfer is automatically out of contention if he has not played a minimum of 
                            six games required to permute the final score. The golfer with least score is declared our championship 
                            golfer of the year.  
                        </Text>

                    </View>
                    
                </View>

            </View>  
        </ImageBackground>
        </View>  
    )
}

export default CompetitionsScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    bgImage: {
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    mainHeader: {
        marginTop: 36,
        width: '100%',
        textAlign: 'center',
        color: CustomColors.gray600,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    contestContainer: {
        backgroundColor: CustomColors.blue050,
        width: '100%',
        marginBottom: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderColor: CustomColors.orange600,
        borderWidth: 2,
        borderRadius: 16,
    },
    header: {
        width: '100%',
        textAlign: 'left',
        color: CustomColors.gray600,
        fontSize: 20,
        fontWeight: 'bold',
    },
    paragraph: {
        marginTop: 8,
        fontWeight: '600',
    },
})