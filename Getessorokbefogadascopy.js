import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image,Button} from 'react-native';
import Ipcim from './Ipcim';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+'orokbefogad');
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
                    {item.felhasznalo_teljesnev},  {item.orokbefogado},  {item.orokbeado}
                </Text>
                
                
             
            </View>
           
             
          )}
        />
      )}
    </View>
  );
};

export default App;