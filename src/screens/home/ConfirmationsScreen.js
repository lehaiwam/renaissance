import React, { useEffect ,useState, useContext } from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, View, Pressable} from 'react-native'

import {db} from '../../firebaseConfig'
import { collection, query, where, getDocs } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { Octicons } from '@expo/vector-icons'
import ConfirmModal from '../../components/calendar/ConfirmModal'
import LoadingOverlay from '../../components/UI/LoadingOverlay'
import { CustomColors } from '../../constants/CustomColors'
import { sendConfirmationsList } from '../../util/sendSMSNotifications'

const ConfirmationsScreen = ({navigation, route}) => {
    const bgImage = require('../../images/login_background.jpeg')

    const authCtx = useContext(AuthContext);
    // const userId = authCtx.id
    const {game, userId} = route.params
    console.log('Confirmations for this game: ', game.title, ', this userId: ', userId)

    let counter=0
    const [confirmActionModal, setConfirmActionModal] = useState(false)
    const [confirmations, setConfirmations] = useState([])
    const [isLoading, setIsLoading] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // useEffect() to load all confirmed golfers for a specific game
    useEffect(() => {
        console.log('UseEffect() loading confimations')
        const getConfirmations = async() => {
            const tempArray = []
            const q = query(collection(db, game.title), where("confirmed", "==", true))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                console.log('No confirmations as yet for this game')
                setErrorMessage('No confirmations as yet for this game?')
                setConfirmations(tempArray)    
            } else {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data())
                    tempArray.push({
                        id: doc.id, 
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                    })
                })
                setConfirmations(tempArray)
            }
            setIsLoading(false)             
        }    

        setIsLoading(true)
        getConfirmations()

    }, [])

    const createAndSendList = () => {
        console.log('Creating a confirmation HTML document...')
        sendConfirmationsList(game, confirmations)
    }


    if (isLoading) {
        return (
          <LoadingOverlay message={'Please be patient! Fetching data online...'}/>
        )
    }
    
    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>

            <ConfirmModal 
                confirmActionModal={ confirmActionModal }
                setConfirmActionModal={ setConfirmActionModal }
                userId={ userId }
                game={ game }
            />

            <View style={styles.mainContainer}>
                <View style={styles.gameInfo}>
                        <View style={styles.infoTop}>                 
                            <Text style={[styles.gameText, styles.gameTitle]}>{ game.title }</Text>
                            <Text style={styles.gameText}>{ game.date }</Text>
                            <Text style={styles.gameText}>@ { game.course }</Text>
                        </View>
                </View>

                { errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text> }

                { confirmations.length > 0 && 
                    <View style={styles.listContainer}>
                        <Pressable 
                            style={ ({pressed}) => [styles.pressableOuter, pressed && styles.pressed ] }
                            onPress={ createAndSendList } 
                        >
                            <View style={styles.pressableInner}>
                                <Octicons name="checklist" size={24} color={CustomColors.white} />
                                <Text style={styles.sendCopyText}>
                                    Get PDF Copy
                                </Text>
                            </View>
                        </Pressable>    

                        <FlatList 
                            data={ confirmations }
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                { counter += 1 }
                                return (
                                <Text style={styles.listItemText}>{counter}. {item.firstName} {item.lastName}</Text> 
                                )
                            }}
                        />
                    </View>
                } 

                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Wish to confirm or cancel attendance?</Text>
                    <Pressable 
                        style={ ({pressed}) => [ styles.button, pressed && styles.pressed ]}
                        onPress={ () => setConfirmActionModal(true) }
                    >
                        <Text  style={styles.buttonText}>Click here</Text>
                    </Pressable>
                </View>
            </View>
            
        </ImageBackground>
    )
}

export default ConfirmationsScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
    },    
    gameInfo: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: CustomColors.blue050,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 16,
        marginVertical: 16,
        paddingVertical: 12,
    },
    infoTop: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    gameTitle: {
        textTransform: 'uppercase',
    },
    gameText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: CustomColors.gray800,
    },
    //
    listContainer: {
        backgroundColor: CustomColors.blue050,
        width: '100%',
        justifyContent: 'center',
        alignItems:'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 16,
        borderRadius: 16,

        borderColor: 'green',
        borderWidth: 2,
    },
    pressableOuter: {
        backgroundColor: CustomColors.blue600, 
        flexDirection: 'row',
        //width: '50%',
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        padding: 8,
        paddingHorizontal: 12,
    },  
    pressableInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    /*
    actionCopyContainer: {
        backgroundColor: CustomColors.blue100,
        flexDirection: 'row',
        width: '50%',
        borderColor: CustomColors.primary800,
        borderWidth: 2,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 10,
    },
    /*
    flatList: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    
    hardCopy: {
        width: '100%',
        
        width: 100,
        height: 40,
        marginVertical: 12, 
        marginRight: 12,
        borderColor: CustomColors.primary800,
        borderWidth: 2,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    */
    sendCopyText: {
        color: CustomColors.white,
        fontWeight: '600',
        marginLeft: 16,
    },
    listItemText: {
        color: CustomColors.gray800,
        fontWeight: '600',
        fontSize: 16,
    },
    //
    actionContainer: {
        width: '100%',
        //flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    actionText: {
        color: CustomColors.white,
        fontWeight: '600',
        fontSize: 20,
    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: CustomColors.blue600, 
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: CustomColors.white,
        fontSize: 16,
        fontWeight: '800',
    },
    pressed: {
        opacity: 0.5,
    },

    errorMessageText: {
      color: CustomColors.error500,
      fontSize: 20,
      fontWeight: 'bold',
    },

})