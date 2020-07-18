import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import History from './src/screens/History';
import BookDetail from './src/screens/BookDetail';
import { Root } from 'native-base'

import {Provider} from 'react-redux';
import storage from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const {store, persistor} = storage;

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTab = () =>{
  return(
    <>
      <Tab.Navigator
      activeColor="#ffff"
      inactiveColor="#838388"
      barStyle={{ backgroundColor: 'black' }}>
        <Tab.Screen name="Home" component={Home} options={{tabBarLabel: 'Home', tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="home-variant" color={color} size={26} /> ),}}/>
        <Tab.Screen name="Search" component={Search} options={{ tabBarLabel: 'Search', tabBarIcon: ({ color }) => ( <MaterialIcons name="search" color={color} size={26} /> ),}}/>
        <Tab.Screen name="History" component={History} options={{ tabBarLabel: 'History', tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="book" color={color} size={26} /> ),}}/>
      </Tab.Navigator>
    </>
  )
}

const App = (props) => {
  // const [isLogin, setIsLogin] = useState(false);
  // login = () => {
  //   setIsLogin(true)
  // }
  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Root>
          <Stack.Navigator>
            {/* {!isLogin ? 
            (<>
              <Stack.Screen name="Login"  options={{ headerTransparent: true, headerShown: false }}>{props => <Login {...props} login={login} />}</Stack.Screen>
              <Stack.Screen name="Signup" component={Signup} options={{ headerTransparent: true, headerShown: false }}/>
            </>)
            : 
            (<>
              <Stack.Screen name="Main" component={BottomTab} options={{ headerTransparent: true, headerShown: false }}/>
            </>)} */}

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
            <Stack.Screen name="Dashboard" component={BottomTab} options={{headerShown: false}}/>
            <Stack.Screen name="BookDetail" component={BookDetail} options={{headerShown: false}}/>
          </Stack.Navigator>
          </Root>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </>
  );
};


export default App;
