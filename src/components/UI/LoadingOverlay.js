import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { CustomColors } from '../../constants/CustomColors'

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>

      <View style={ styles.dataLoadingContainer }>
        <ActivityIndicator size="large" color="#ff7b00" />
        <Text style={styles.dataLoadingText}>{message}</Text>
      </View>


    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: CustomColors.blue100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: CustomColors.orange600,
  },

  //
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
    color: '#c34798', // CustomColors.green800,
  },

});