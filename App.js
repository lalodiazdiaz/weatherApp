import axios from 'axios';
import React, {useState, useCallback} from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const api = {
    key: '95c838504995c1275fa6016b1689c039',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    console.log(input);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
      )
      .then(result => {
        console.log(result.data);
        setData(result.data);
      })
      .catch(err => {
        console.dir(err);
      })
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <ImageBackground
        style={styles.image}
        source={require('./assets/bg3.jpeg')}
        resizeMode="cover">
        <View>
          <TextInput
            placeholder="Enter city name and press returtn... "
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color={'#000'} />
          </View>
        )}
        {!data ? null : (
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {`${data?.name} ${data?.sys?.country}`}
            </Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>
              {`${Math.round(data?.main?.temp)} °C`}
            </Text>
            <Text style={styles.minMaxTem}>{`Min ${Math.round(
              data?.main?.temp_min,
            )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8e00',
    textAlign: 'center',
  },
  infoView: {
    alignItems: 'center',
  },
  cityCountryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
  dateText: {
    color: 'white',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: 'white',
    marginVertical: 10,
  },
  minMaxTem: {
    fontSize: 22,
    color: 'white',
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default App;
