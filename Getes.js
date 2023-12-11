import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image} from 'react-native';
import Ipcim from './Ipcim';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+'menhelyekkiiras');
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
                    {item.menhely_nev}  {item.menhely_email},  {item.menhely_telefonszam},  {item.telepules_nev},  {item.menehely_cim},  {item.menhely_allatokid}
                </Text>
             <Image source={{uri:Ipcim.Ipcim+item.menhelyek_kep}}  style={{width:300,height:300,margin:'auto'}} />
            </View>
           
             
          )}
        />
      )}
    </View>
  );
};

export default App;