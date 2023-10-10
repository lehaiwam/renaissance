import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, Image, View, Text, Alert, Pressable, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { delay } from '../../util/general-utils'
import { AuthContext } from '../../util/auth-context'

// fibase/firestone
import {db} from '../../firebaseConfig'
import { doc, updateDoc } from "firebase/firestore"

//firebase/storage
import { storage } from '../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { CustomColors } from '../../constants/CustomColors';

const UpdateProfilePictureScreen = ({navigation}) => {
    const bgImage = require('../../images/login_background.jpeg')
    const authCtx = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)

    const getProfileImage = async () => {
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
                        console.log('New Profile Picture load abandoned')
                        //return
                    },
                    style: 'okay',
                },
            ]);
        }
        //console.log('\n\n   Successfully selected an image')
    }

    const uploadImage = async () => {
        // console.log('\n\n   Uploading selected image...')
        try {
            const { uri }  = await FileSystem.getInfoAsync(image)
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => {
                    // return the blob
                    resolve(xhr.response)
                }
                xhr.onerror = (e) => {
                    reject(new TypeError('Network Rquest Failed'))
                }
                xhr.responseType = 'blob'
                xhr.open('GET', uri, true)
                xhr.send(null)
            })

            // console.log('\n\n    5. BLOB: ', JSON.stringify(blob))
            const filename = image.substring(image.lastIndexOf('/') + 1)
            // Replace 'filename' with actual name of logged in user, e.g. 'chippa-ndenga'
            const newFileName = authCtx.firstName.toLowerCase() + '-' + authCtx.lastName.toLowerCase()
            const storageRef = ref(storage, `profile-images/${newFileName}` );
            
            setUploading(true)

            await uploadBytes(storageRef, blob)
            .then((snapshot) => {
                console.log('\n\n   Uploaded a blob or file: ', newFileName);
            })

            /** -------------------------------------------------------------------------- */
            // TODO: Remember to remove this delay
            // Delay continuation for a further 5 secs to see effect of activity indicator
            await delay(5000);
            // console.log("Waited 5s");
            /** -------------------------------------------------------------------------- */

            setUploading(false)
            setImage(null)

            Alert.alert('DONE!!!', 'Image file successfully uploaded to Firebase Cloud Storage.', [
                {  
                    onPress: () => {
                        navigation.goBack()
                        //return
                    },
                    style: 'okay',
                },
            ])

            const downloadUrl = await getDownloadURL(storageRef)
            // console.log('\n\n   Image DownloadUrl: ', downloadUrl)
            const migsRef = doc(db, "migs", authCtx.id);
            await updateDoc(migsRef, { 
                imageUrl: downloadUrl,
            })
        } catch (error) {
            console.log(error)
            setUploading(false)          
        }
    }


    return (
        <ImageBackground style={styles.bgImage} source={ bgImage }>
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
                    onPress={ uploadImage }>
                    <Text style={styles.buttonText}>
                        Upload Image
                    </Text>
                </Pressable>
                </>
            }

            { uploading && 
                <View style={styles.activityWrapper}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            }
        </View>
        </ImageBackground>
    )
}

export default UpdateProfilePictureScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
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
    image: {
        width: 200, 
        height: 200, 
        borderRadius: 100,
        marginVertical: 16, 
    },
    activityWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
})