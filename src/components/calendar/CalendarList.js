import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import CalendarItem from './CalendarItem'
import { CustomColors } from '../../constants/CustomColors'


const CalendarList = ({ user, games }) => {

    if (!games || games.length < 1 ) {
        return (
            <View style={ styles.dataLoadingContainer }>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.dataLoadingText}>Please be patient!</Text>
                <Text style={styles.dataLoadingText}>Fetching data online...</Text>
            </View>
        )
    }

    return (
        <View style={styles.listContainer}> 
            <FlatList 
                data={ games }
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <CalendarItem user={ user} game={ item } />
                    )
                }}
            />
        </View>
    )
}

export default CalendarList

const styles = StyleSheet.create({
    dataLoadingContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    dataLoadingText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '800',
        color: CustomColors.green800,
    },
    listContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        padding: 4, 
    }

})