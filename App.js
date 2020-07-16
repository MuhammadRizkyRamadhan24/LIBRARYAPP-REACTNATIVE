import 'react-native-gesture-handler';
import React from 'react';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = (props) => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerTransparent: true, headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerTransparent: true, headerShown: false }}/>
      </Stack.Navigator>

      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Detail" component={Detail} options={{ headerTransparent: true }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
};


export default App;
