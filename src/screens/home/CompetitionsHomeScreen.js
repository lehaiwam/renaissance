import React from 'react'
import { ImageBackground, StyleSheet, Pressable, View, Text } from 'react-native'

//import { AuthContext } from '../../util/auth-context'

import { CustomColors } from '../../constants/CustomColors'
import IconButton from '../../components/UI/IconButton'
import MenuItemButton from '../../components/UI/MenuItemButton'


const CompetitionsHomeScreen = ({ navigation, route }) => {
    const bgImage = require('../../images/skynews-tiger-woods-5283346.jpg') 
    // const authCtx = useContext(AuthContext)
    // const username = authCtx.authUser.email

    return (
        <ImageBackground style={styles.bgImage} source={ bgImage } resizeMode='cover'>
   
            <View style={styles.container}>
                <Text style={styles.header}>RGC Competitions</Text> 

                <Pressable style={styles.menuItem} 
                    onPress={ () => navigation.navigate('Medal') }
                > 
                    <Text style={styles.menuText} >Medal</Text>
                </Pressable> 

                <Pressable style={styles.menuItem}
                    onPress={ () => navigation.navigate('Stableford') }
                > 
                    <Text style={styles.menuText} >Stableford</Text>
                </Pressable> 

                <Pressable style={styles.menuItem}
                    onPress={ () => navigation.navigate('TubsMemorial') }
                > 
                    <Text style={styles.menuText} >Tubs Memorial</Text>
                </Pressable> 

                <Pressable style={styles.menuItem} 
                    onPress={ () => navigation.navigate('ChampOfChamps') }
                > 
                    <Text style={styles.menuText} >Champ Of Champs</Text>
                </Pressable>

            </View>
        </ImageBackground>   
    )

}

export default CompetitionsHomeScreen

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    header: {
        color: CustomColors.white,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
            },
    text: {
        color: CustomColors.gray800,
    },
    menuItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        borderWidth: 2,
        borderColor: CustomColors.yellow500,
        borderRadius: 12,
        marginTop: 20,
    },
    menuText: {
        paddingHorizontal: 4,
        color: CustomColors.white,
        fontSize: 14,
        fontWeight: '600',
    },
})