import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator,FlatList,Image,Button } from 'react-native';
import Ipcim from './Ipcim';

const Ujlap = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {atkuld1,atkuld2} =route.params


    const getMovies = async () => {
        //alert(atkuld1)
        try {
            var adatok ={
                "atkuld1":atkuld1
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
                {item.telepules_nev},{item.menhely_nev} {item.menhely_email},{item.menhely_telefonszam},{item.menehely_cim}
                </Text>
                <Image source={{uri:Ipcim.Ipcim+item.menhelyek_kep}}  style={{width:300,height:300,margin:'auto'}} /> 

                
            </View>
          
          
        )}
      />
      
    )}
    <Button onPress={() => navigation.navigate('Kozosscreen')} title="Vissza a választó felületre!" />  
  </View>
  );
};



export default Ujlap;