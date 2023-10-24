import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomColors } from '../../constants/CustomColors'

const bgImage = require('../../images/tiger-fist-pump.jpeg')

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>
        Under Construction
      </Text>
      <Text style={styles.messageText}>
        Coming Soon!
      </Text>
    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
    color: CustomColors.error100,
    fontWeight: '800',
    marginTop: 20,
  },
})