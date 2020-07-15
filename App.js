import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Login from './src/screens/Login'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = (props) => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Detail" component={Detail} options={{ headerTransparent: true }}/>
        <Stack.Screen name="Login" component={Login}  options={{ headerTransparent: true,
        headerBackTitleVisible: true,
        headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};


export default App;
