import { StyleSheet, Text, View, Animated, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'

import { MedalChampionsData } from '../../data/Champions'
import SlideItem from './SlideItem'
import Pagination from './Pagination'
import { CustomColors } from '../../constants/CustomColors'


const Slider = ({sliderData}) => {

  const [index, setIndex] = useState(0)
  const scrollX = useRef( new Animated.Value(0)).current

  const handleOnScroll = (event) => {
    //console.log('Scrolling...')
    Animated.event(
      [
        {
          nativeEvent: { contentOffset: { x: scrollX }}
        }
      ],
      {
        useNativeDriver: false,
      }
    )(event)
  }
  

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    //console.log('viewableItems -> ', viewableItems)
    setIndex(viewableItems[0].index)
  }).current


  return (
    <View style={styles.flatListWrapper}>
      <FlatList 
        data={ sliderData }
        renderItem={  ({item}) => <SlideItem item={item} /> } 
        keyExtractor={ (item) => item.id }
        horizontal={true}
        pagingEnabled={true}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={ handleOnScroll }
        onViewableItemsChanged={ handleOnViewableItemsChanged }
      />
      <View style={styles.pagination}>
          <Pagination data={ sliderData } scrollX={scrollX} index={index}/>
      </View>
    </View>
  )
}

export default Slider 

const styles = StyleSheet.create({
    flatListWrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})