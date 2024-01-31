import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator,FlatList,Image,Button } from 'react-native';
import Ipcim from './Ipcim';

const Ujlapfelhasznalo = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {atkuld11,atkuld12} =route.params
    const [felulnev, setFelulnev] = useState([]);


    const getMovies = async () => {
        //alert(atkuld1)
        try {
            var adatok ={
                "atkuld11":atkuld11
            }
          const response = await fetch(Ipcim.Ipcim+'keresfelhasznalo' ,{
            method: "POST",
            body: JSON.stringify(adatok),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          const json = await response.json();
          setData(json);
          setFelulnev(json[0].felhasznalo_teljesnev)
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
      <View>
        <Text>
          {felulnev}
        </Text>
      <FlatList
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
            <View>
                  <Text>
                    {item.felhasznalo_teljesnev},{item.felhasznalo_email}, {item.felhasznalo_telefon}
                  </Text>
                
            </View>
          
          
        )}
      />

      
      </View>
    )
    }
    
    <Button onPress={() => navigation.navigate('Getesorokbefogadas')} title="Vissza a választó felületre!" />  
  </View>
  );
};



export default Ujlapfelhasznalo;