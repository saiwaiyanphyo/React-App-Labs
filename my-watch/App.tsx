import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

interface AppState {
  timeElapsed: number | null;
  running: boolean;
  startTime: Date | null;
  laps: number[];
}

const App: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [laps, setLaps] = useState<number[]>([]);
  const [totalElapsed, setTotalElapsed] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        if (startTime) {
          setTimeElapsed(totalElapsed + (new Date().getTime() - startTime.getTime()));
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [running, startTime, totalElapsed]);

  const handleStartPress = () => {
    if (running) {
      // Stop
      setRunning(false);
      setTotalElapsed(timeElapsed);
      setStartTime(null);
    } else {
      // Start or resume
      setStartTime(new Date());
      setRunning(true);
    }
  };

  const startStopButton = () => {
    var style = running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight underlayColor="gray"
      onPress={handleStartPress} style={[styles.button, style]}>
      <Text>
        {running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  }

  const showLaps = () => {
    return laps.map(function(time, index) {
      return <View key={index} style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  }

  const lapButton = () => {
    return <TouchableHighlight style={styles.button}
    underlayColor="gray" onPress={handleLapPress}>
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  }

  const handleLapPress = () => {
    if (running) {
      const newLaps = [timeElapsed, ...laps];
      setLaps(newLaps.slice(0, 5));
      setTotalElapsed(timeElapsed);
      setStartTime(new Date());
    } else {
      setLaps([]);
      setTimeElapsed(0);
      setTotalElapsed(0);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {formatTime(timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={[styles.button, running ? styles.stopButton : styles.startButton]}
            underlayColor='gray'
            onPress={handleStartPress}
          >
            <Text>{running ? 'Stop' : 'Start'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor='gray'
            onPress={handleLapPress}
          >
            <Text>{running ? 'Lap' : 'Clear'}</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.footer}>
        <ScrollView>
          {laps.map((lap, index) => (
            <View key={index} style={styles.lap}>
              <Text style={styles.lapText}>Lap #{laps.length - index}</Text>
              <Text style={styles.lapText}>{formatTime(lap)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  lapText: {
    fontSize: 30
  },
  startButton: {
    borderColor: 'green'
  },
  stopButton: {
    borderColor: 'red'
  }
});

export default App;