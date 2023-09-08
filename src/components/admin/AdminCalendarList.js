import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import AdminCalendarItem from './AdminCalendarItem'
import { CustomColors } from '../../constants/CustomColors'


const AdminCalendarList = ({ userId, games }) => {

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
                        <AdminCalendarItem userId={ userId } game={ item } />
                    )
                }}
            />
        </View>
    )
}

export default AdminCalendarList

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
        paddingHorizontal: 8, 
    }

})