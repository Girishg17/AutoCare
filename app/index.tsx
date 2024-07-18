import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../Views/Signin';
import SignUpScreen from '../Views/SignUp';
import Home from '../Views/Home'
import Services from '../Views/Services';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Signin" >
        <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
        <Stack.Screen name="Services" component={Services} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeScreen;
