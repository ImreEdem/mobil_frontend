import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import Ipcim from './Ipcim';

const Ujlap = ({route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {atkuld1} = route.params

  const getMovies = async () => {
    alert({atkuld1})
    /*
    try {
        var adatok ={
            "atkuld1":{atkuld1}
        }
      const response = await fetch(Ipcim.Ipcim+'keresvaros' ,{
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    */
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
            <Text>
              {item.menhely_nev}, {item.menhely_email}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Ujlap;