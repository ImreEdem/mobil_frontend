import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View,Image} from 'react-native';
import Ipcim from './Ipcim';

const App = (route, navigate) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {atkuld21,atkuld22} = route.params

  const getMovies = async () => {
    try {
        var adatok2 = {
            "atkuld21":atkuld21
        }
    const response = await fetch(Ipcim.Ipcim+'allatkiiras' ,{
        method: "POST",
        body: JSON.stringify(adatok2),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View>
            <Text>
              {item.allatok_nev},{item.allatok_leiras}
            </Text>
            <Image source={{uri:Ipcim.Ipcim+item.allatok_kep}} style={{width:300,height:300,margin:'auto',borderWidth:4,borderColor:'blue',borderRadius:3}} /> 
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;