import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CustomColors } from '../../constants/CustomColors'
import ChampionImageModal from './ChampionImageModal'

const SlideItem = ({item}) => {
    const [showChampionImageModal, setShowChampionImageModal] = useState(false)

    return (
        <View style={styles.itemContainer}>
            <ChampionImageModal 
                showChampionImageModal = { showChampionImageModal }
                setShowChampionImageModal = { setShowChampionImageModal }
                golferName = { item.name }
                imageUrl = { item.imageUrl }
            />
            <Text style={styles.headerText} >{item.description}</Text>
            <Pressable 
                style={styles.imageContainer}
                onPress={ () => setShowChampionImageModal(true)}>
                <Image 
                    style={styles.image}
                    source={item.imageUrl}
                    resizeMode='contain'
                />
            </Pressable>
            <Text style={styles.nameText}>{item.name}</Text>
        </View>
    )
}

export default SlideItem

const styles = StyleSheet.create({
    itemContainer: {
        //width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 110,
    },
    headerText: {
        height: '15%',
        width: '100%',
        textAlign: 'center',
        color: CustomColors.orange600,
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '100%',
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 130,
        height: '85%',
        borderRadius: 20,
        marginVertical: 4,
    },
    nameText: {
        width: '100%',
        height: '15%',
        color: CustomColors.blue600,
        textAlign: 'center',
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: 'bold',
    }
})