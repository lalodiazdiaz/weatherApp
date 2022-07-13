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
  const [data, setData] = useState([]);

  const api = {
    key: '95c838504995c1275fa6016b1689c039',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      //https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
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
            onChange={text => setInput(text)}
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
  },
});

export default App;
