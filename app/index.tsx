import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../Views/Signin';
import SignUpScreen from '../Views/SignUp'; // Create this screen

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeScreen;
