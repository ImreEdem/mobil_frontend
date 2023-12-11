import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Proba from "./Proba";
import Getes from "./Getes";
import Lenyilo from "./Lenyilo";
import Kepfeltoltes from "./Kepfeltoltes";
import Felvitel from "./Felvitel"



function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Button
        onPress={() => navigation.navigate('Próba')}
        title="Go to Próba"
      />
      <Button
        onPress={() => navigation.navigate('Getes')}
        title="Getes screen megnyitása"
      />
      <Button
        onPress={() => navigation.navigate('Lenyilo')}
        title="Go to Lenyilo"
      />
      <Button
        onPress={() => navigation.navigate('Proba')}
        title="Proba screen meghívása"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function probaScreen({ navigation }){
  return(
    
    <Proba/>

  );
}

function GetesScreen ({ navigation})
{
  return(

    <Getes/>
    
  );
}

function LenyiloScreen ({ navigation})
{
  return(

    <Lenyilo/>
    
  );
}

function kepfeltoltes ({ navigation})
{
  return(

    <Kepfeltoltes/>
    
  );
}





const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root ({ navigation})
{
  return(

      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name='Próba' component={probaScreen}/>
        <Drawer.Screen name='Getes' component={GetesScreen}/>
        <Drawer.Screen name='Lenyilo' component={LenyiloScreen}/>
        <Drawer.Screen name='Kepfeltoltes' component={kepfeltoltes}/>
        <Drawer.Screen name='Felvitel' component={Felvitel}/>
      </Drawer.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Root" component={Root} options={{headerShown:false}} />
        <Stack.Screen name="Proba" component={Proba} />
      </Stack.Navigator>

    </NavigationContainer>

    
  );
}