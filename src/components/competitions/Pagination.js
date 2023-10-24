import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React from 'react'
import { CustomColors } from '../../constants/CustomColors'

const {width} = Dimensions.get('screen')

const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.paginationContainer}>
        { 
            data.map( ( _, idx ) => {

                const inputRange = [(idx-1)*width, idx*width, (idx+1)*width]
                const outputRange = [12, 30, 12]
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange,
                    extrapolate: 'clamp',
                })

                return (
                    <Animated.View 
                        key={idx.toString()}
                        style={[styles.dot, {width: dotWidth}, 
                        idx === index && styles.dotActive]}
                    />
                )
            }) 
        }
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    paginationContainer: {
        position: 'absolute',
        bottom: 8, 
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 8,
        borderRadius: 6,
        marginHorizontal: 4,
        backgroundColor: '#aea8a8',
    },
    dotActive: {
        backgroundColor: CustomColors.orange600,
    },
})