import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CarDetailsScreen } from '../screens/CarDetailsScreen';
import { SellCarScreen } from '../screens/SellCarScreen';
import { ManageCarsScreen } from '../screens/ManageCarsScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
                <Stack.Screen name="SellCar" component={SellCarScreen} />
                <Stack.Screen name="ManageCars" component={ManageCarsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};