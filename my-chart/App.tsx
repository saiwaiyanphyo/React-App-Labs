import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import StockButton from './StockButton'; // Assuming you have this component
import API from './api'; // Assuming you have this API function

interface StockData {
  "Time Series (Daily)": {
    [date: string]: {
      "4. close": string; 
      // Add other properties if needed based on your API response
    };
  };
}

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2
};

const Stocks: React.FC = () => {
  const [dates, setDates] = useState<string[]>(["01/01", "02/01", "03/01", "04/01", "05/01", "06/01", "07/01"]);
  const [prices, setPrices] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);

  const changeIndex = (stockCode: string, stockName: string) => {
    API(stockCode)
      .then((stock: StockData) => {
        // Extract the dates and closing prices from the API response
        const datesArray = Object.keys(stock["Time Series (Daily)"]).slice(0, 6);
        const closingPrice = datesArray.map(day => parseFloat(stock["Time Series (Daily)"][day]["4. close"]));
        const datesArrayRev = datesArray.reverse();

        // update the dates and prices states
        setDates(datesArrayRev);
        setPrices(closingPrice);
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
        // Handle error appropriately (e.g., show an error message to the user)
      });
  };

  // useEffect for initial data fetch (if needed)
  useEffect(() => {
    changeIndex('AAPL', 'Apple'); // Fetch data for AAPL on component mount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LineChart
          data={{
            labels: dates,
            datasets: [{
              data: prices,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2
            }]
          }}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={chartConfig}
          style={{ paddingVertical: 10 }}
        />
      </View>
      <View style={styles.footer}>
        <StockButton code='AAPL' name='Apple' onPress={() => changeIndex('AAPL', 'Apple')} />
        <StockButton code='GOOGL' name='Google' onPress={() => changeIndex('GOOGL', 'Google')} />
        <StockButton code='UBER' name='Uber' onPress={() => changeIndex('UBER', 'Uber')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow'
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'pink'
    },
    button: {
      margin: 10,
      borderWidth: 1,
      width: 100,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgray'
    }
  });

export default Stocks;