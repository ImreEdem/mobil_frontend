import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedTelepules, setSelectedTelepules] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.10.55:3000/lenyilolista');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const kattintas = () => {
    alert(selectedTelepules)
  }

  useEffect(() => {
    getMovies();
  }, []);



  return (
    <View style={{flex: 1, padding: 24}}>
    
    <Picker
  selectedValue={selectedTelepules}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedTelepules(itemValue)
  }>
  {data.map((item)=>{
        return(
        
        <Picker.item label={item.telepules_nev} value={item.telepules_id}/>
        
         
	)}
	)}
</Picker>

    <Button
        onPress={() => kattintas()}
        title="Teszt"
    />










    </View>
  );
};

export default App;