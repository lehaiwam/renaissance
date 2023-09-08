import React, { useState, useContext } from 'react';
import { StyleSheet, Button, Image, View, Text, Alert, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { AuthContext } from '../../util/auth-context'
import { storage } from '../../firebaseConfig'
import { ref, uploadBytes } from 'firebase/storage'

import { CustomColors } from '../../constants/CustomColors';

const UpdateProfilePictureScreen = ({navigation}) => {

    const authCtx = useContext(AuthContext);

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)

    const getProfileImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            // console.log('\n   image:', result.assets[0].uri)
            setImage(result.assets[0].uri);
        } else {
            Alert.alert('Select New Profile Picture', 'Action Cancelled', [
                {   text: 'OK', 
                    onPress: () => {
                        console.log('OK Pressed')
                        //return
                    },
                    style: 'okay',
                },
            ]);
        }
    }

    const uploadProfileImage = async () => {
        console.log('\n\n    1. Uploading...image: ', image)
        setUploading(true)

        try {
            console.log('\n\n    2. Getting URI...')
            const { uri }  = await FileSystem.getInfoAsync(image)
            console.log('\n\n    3. URI: ', uri)

            const blob = await new Promise((resolve, reject) => {
                console.log('\n\n   4. Inside the promise() initiating XMLHttps...: ')
                const xhr = new XMLHttpRequest()
                xhr.onload = () => {
                    // return the blob
                    console.log('\n    4.1 RESOLVED...')
                    resolve(xhr.response)
                }
                xhr.onerror = (e) => {
                    console.log('\n     4.2 REJECT...')
                    reject(new TypeError('Network Rquest Failed'))
                }
                xhr.responseType = 'blob'
                xhr.open('GET', uri, true)
                xhr.send(null)
            })

            console.log('\n\n    5. BLOB: ', JSON.stringify(blob))

            const filename = image.substring(image.lastIndexOf('/') + 1)
            console.log('\n\n    6. FILENAME: ', filename)

            // TODO: replace 'filename' with actual name of logged in user, e.g. 'Chippa-Ndenga'
            const newFileName = authCtx.firstName.toLowerCase() + '-' + authCtx.lastName.toLowerCase()
            console.log('\n\n    7. NEW FILENAME: ', newFileName)

            const storageRef = ref(storage, `profile-images/${newFileName}` );
            // 'file' comes from the Blob or File API
            await uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('\n\n    8. Uploaded a blob or file!');
            });

            setUploading(false)
            console.log('\n\n    9. Image file successfully uploaded!!!')
            setImage(null)

            Alert.alert('DONE!!!', 'Image file successfully uploaded to Firebase Cloud Storage.', [
                {  
                    onPress: () => {
                        navigation.goBack()
                        //return
                    },
                    style: 'okay',
                },
            ]);

        } catch (error) {
            console.log(error)
            setUploading(false)          
        }
    }



    return (
        <View style={styles.mainContainer}>
            { !image && 
                <Pressable 
                    style={ ({pressed}) => [ styles.button, pressed && styles.pressed ]}
                    onPress={ getProfileImage }>
                    <Text style={styles.buttonText}>
                        Select image from camera roll
                    </Text>
                </Pressable>
            }
        

            { image && 
                <>
                <Image 
                    style={styles.image} 
                    source={{ uri: image }}    
                />


                <Pressable 
                    style={ ({pressed}) => [ styles.button, pressed && styles.pressed ]}
                    onPress={ uploadProfileImage }>
                    <Text style={styles.buttonText}>
                        Upload Image
                    </Text>
                </Pressable>

                </>
            }
            
        </View>
    )
}

export default UpdateProfilePictureScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 12,
        marginVertical: 16,
        backgroundColor:'#4792bb',
        elevation: 1,
        borderColor: CustomColors.white, 
        borderWidth: 2,
        borderRadius: 20,
        width: '60%',
    },
    buttonText: {
        color: CustomColors.white,
    },
    pressed: {
        opacity: 0.5,
    },
    btnContainer: {
        width: '50%',
        borderRadius: 30,
    },
    image: {
        width: 200, 
        height: 200, 
        borderRadius: 100,
        marginVertical: 16, 
    },
})