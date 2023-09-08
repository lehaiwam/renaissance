import React, { useEffect ,useState, useContext } from 'react'
import { ImageBackground, ScrollView, KeyboardAvoidingView, Button,
         StyleSheet, Text, View, TextInput, Image, Switch, Platform, Pressable } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import {SelectList} from 'react-native-dropdown-select-list'
import { Fontisto } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

import {db} from '../../firebaseConfig'
import { doc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import CustomButton from '../../components/UI/CustomButton'
import OutlineButton from '../../components/UI/OutlineButton'

const data = [
    { key: '1', value: 'Not Scheduled'},
    { key: '2', value: 'Scheduled'},
    { key: '3', value: 'Booked'},
    { key: '4', value: 'Completed'},
]
const monthDesc = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const AdminGameDetailsScreen = ({navigation, route}) => {
    const bgImage = require('../../images/login_background.jpeg')
    const groupImage = require('../../images/group-vaal-degrace-2021.jpg')

    const authCtx = useContext(AuthContext);

    const now = new Date()
    const [teeDate, setTeeDate] = useState(now)  // set state to handle the tee date
    const [teeTime, setTeeTime] = useState(now.getHours() + ':' + now.getMinutes())  // set state to handle the tee time
    const [mode, setMode] = useState('date')
    const [showDateModal, setShowDateModal] = useState(false)
    const [showTimeModal, setShowTimeModal] = useState(false)
    const [text, setText] = useState('Empty')
 


    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [teeOff, setTeeOff] = useState( '')
    const [course, setCourse] = useState('')
    const [weekendAway, setWeekendAway] = useState(false)
    const [gameStatus, setGameStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [selected, setSelected] = React.useState('')

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log('Loading useEffect...')
        const initForm = () => {
            const { game} = route.params

            setId(game.id)
            setTitle(game.title)
            setDate(game.date)
            setTeeOff(game.teeOff)
            setCourse(game.course)
            setWeekendAway(game.weekendAway)
            setGameStatus(game.status)
            setErrorMessage('')
        }

        if (isFocused) {
            initForm()
        }

    }, [isFocused])


    const onDateChange = (event, selectedDate) => {

        if (selectedDate !== oldSselectedDate) {
            console.log('Always execute...')
            selectedDate ? setTeeDate(selectedDate) : setTeeDate(new Date())
        }
        setShowDateModal(Platform.OS === 'ios')

        const strTeeDateTime = teeDate.toUTCString()
        setDate( () => strTeeDateTime.slice(0, 16) )
        const oldSselectedDate = selectedDate
    }

    const onTimeChange = (event, selectedDate) => {

        if (selectedDate === oldSelectedDate)
            return

        setShowTimeModal(Platform.OS === 'ios')

        let strHrs = selectedDate.getHours()
        if (strHrs <= '9') {
            strHrs = '0'+ strHrs
        }
        let strMins = selectedDate.getMinutes()
        if (strMins <= '9') {
            strMins = '0'+ strMins
        }

        const strTime = strHrs + 'h' + strMins
        setTeeOff( strTime )
        const oldSelectedDate = selectedDate
    }


    const saveChanges = async () => {
        console.log('\n  Before status: ', gameStatus)

        console.log('\n   Selected: ', selected)
        data.forEach((item) => {
            console.log('item: ', item)
            if (item.key === selected) {
                console.log('setting status to :', item.key)
                setGameStatus(item.key)
            }
        })

        console.log('\n   Saving changes made to Calendar, status: ', gameStatus)
        
        
        try {
            const calendarRef = doc(db, "calendar", id);
            await updateDoc(calendarRef, { 
                title: title,
                date: date,
                teeOff: teeOff,
                course: course,
                status: selected,
                weekendAway: weekendAway,
            })
        } catch (error) {
            console.log('Error on CALENDAR updateDoc(): ', error) 
        }
        
        navigation.navigate('AdminCalendar')
    }

    
    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>

            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                { errorMessage &&  <Text style={styles.errorTextMessage}>{errorMessage}</Text> }

                <View style={styles.groupImgContainer}>
                    <Image
                        style={styles.groupImage}
                        source={ groupImage }
                    />
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.fullNameContainer}>

                        { showDateModal && (
                            <DateTimePicker 
                                testID={'dateTimePicker'}
                                value={teeDate}
                                mode={mode}
                                is24Hour={true}
                                display={'default'}
                                onChange={ onDateChange }
                            />
                        )}

                        <View style={styles.firstContainer}>
                            <View style={styles.datePickerContainer}>
                                <Text style={styles.labelText}>Date</Text>
                                <Pressable 
                                    style={ ({pressed}) => [styles.button, pressed && styles.press ] } 
                                    onPress={() => {
                                        setMode('date')
                                        setShowDateModal(true)
                                    }}
                                >
                                    <Fontisto name="date" size={20} color="yellow" />   
                                </Pressable>
                            </View>
                            <Text style={ styles.inputContainer } >{date}</Text>
                        </View>

                        { showTimeModal && (
                            <DateTimePicker 
                                testID={'dateTimePicker'}
                                value={teeDate}
                                mode={mode}
                                is24Hour={true}
                                display={'default'}
                                onChange={ onTimeChange }
                            />
                        )}

                        <View style={styles.firstContainer}>
                            <View style={styles.datePickerContainer}>
                                <Text style={styles.labelText}>Tee Off</Text>
                                <Pressable 
                                    style={ ({pressed}) => [styles.button, pressed && styles.press ] } 
                                    onPress={() => {
                                        setMode('time')
                                        setShowTimeModal(true)
                                    }}
                                >
                                    <MaterialCommunityIcons name="clock-time-two" size={24} color="yellow" />  
                                </Pressable>
                            </View>
                            <Text style={ styles.inputContainer } >{teeOff}</Text> 
                        </View>
                    </View>

                    <View style={styles.fullNameContainer}>
                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>Title</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                value={title.toUpperCase()}
                                onChangeText={(value) => setTitle(value)}
                            />
                        </View>
                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>Course</Text>
                            <TextInput 
                                style={ styles.inputContainer }
                                value={course}
                                onChangeText={(value) => {
                                    setErrorMessage('')
                                    setCourse(value)
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.fullNameContainer}>
                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>Weekend Away?</Text>
                            <View style={styles.switchDescriptor}>
                                <Switch
                                    value={weekendAway}
                                    onValueChange={ (value) => setWeekendAway(value) }
                                    thumbColor={weekendAway ? 'gold' : 'red'}
                                /> 
                                <Text 
                                    style={styles.descriptorDisplay}
                                >{ weekendAway ? 'Yes' : 'No'}</Text>
                            </View>
                        </View>

                        <View style={styles.firstContainer}>
                            <Text style={styles.labelText}>Status</Text>
                            <View style={styles.dropdownContainer }>
                                <SelectList 
                                    data={data} 
                                    setSelected={setSelected}
                                    maxHeight={160} 
                                    boxStyles={{backgroundColor:CustomColors.blue050}}
                                    inputStyles={{fontSize:16, fontWeight:'600',color:CustomColors.gray600}}
                                    dropdownStyles={{backgroundColor: CustomColors.blue050}}
                                    dropdownTextStyles={{fontSize:16, fontWeight:'600',  color:CustomColors.gray600}}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <CustomButton 
                    color={ CustomColors.white }
                    passedFunction={ saveChanges }
                >
                    Save
                </CustomButton>

                <OutlineButton 
                    passedOnFunction={() => navigation.goBack()}
                    color={ CustomColors.white }
                >
                    Cancel
                </OutlineButton>

            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default AdminGameDetailsScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },

    notLoggedInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notLoggedInText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CustomColors.error500,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',   
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    scrollView: {
        width: '100%',
        height: '100%',
        paddingVertical: 10,
    },
    errorMessageText: {
      color: CustomColors.error500,
      fontSize: 20,
      fontWeight: 'bold',
    },

    groupImgContainer: {
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: CustomColors.white,
        borderWidth: 2,
        borderRadius: 30,
        width: '100%',
        height: '30%',
    },

    groupImage: {
        alignSelf: 'center',
        borderRadius: 30,
        width: '100%',
        height: '100%',
    },

    fullNameContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },

    labelText: {
        width: '80%',
        textAlign: 'left',
        color: CustomColors.white,
        fontSize: 16,
    },
    firstContainer: {
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    datePickerContainer: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },





    fullWidthContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    inputContainer: {
        backgroundColor: CustomColors.blue050,
        width: '90%',
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginTop: 4,
        marginHorizontal: 12,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 4,
        borderColor: CustomColors.white,
        borderWidth: 1,
    },
    switchDescriptor: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderColor: CustomColors.white,
        borderRadius: 8,
        borderWidth: 1,
    }, 
    /* 
    switch: {
        width: '40%',
    },
    */
    descriptorDisplay: {
        backgroundColor: CustomColors.blue050,
        textAlign: 'center',
        width: '60%',
        paddingHorizontal: 8,
        marginHorizontal: 8,
        color: CustomColors.gray800,
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 4,
        borderColor: CustomColors.white,
        borderWidth: 1,
    },

    //
    dropdownContainer: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        // justifyContent: 'flex-end',
        // width: '90%',
        borderColor: CustomColors.white,
        borderWidth: 1,
        borderRadius: 8,

    },
    dropdown: {
        backgroundColor: CustomColors.blue050,
        height: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 4,
    },
})