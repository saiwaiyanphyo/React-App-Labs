import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.top_half_container}>
        <View style={styles.left_half_container}>
          <View style={[{width: 50, height: 50, backgroundColor: 'red'}]}/>
        </View>
        <View style={styles.right_half_container}>
          <View style={[{width: 50, height: 50, backgroundColor: 'blue'}]}/>
        </View>
      </View>
      <View style={styles.bottom_half_container}>
        <View style={styles.left_half_container}>
          <View style={[{width: 50, height: 50, backgroundColor: 'green'}]}/>
        </View>
        <View style={styles.right_half_container}>
          <View style={[{width: 50, height: 50, backgroundColor: 'yellow'}]}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top_half_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  bottom_half_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  left_half_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  right_half_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
