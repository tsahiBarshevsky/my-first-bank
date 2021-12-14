import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { getIsFirstUse, getActions, getCurrency, getGoals, getName } from './utils/AsyncStorageHandler';
import RegistrationScreen from './components/Registration Screen';
import HomeScreen from './components/Home Screen';
import GoalInsertion from './components/Insertion Screens/Goal';
import ActionInsertion from './components/Insertion Screens/Action';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isFirstUse, setIsFirstUse] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetching data from AsyncStorage
        Promise.all([
            getCurrency(),
            getGoals(),
            getActions(),
            getIsFirstUse(),
            getName()
        ])
            .then(([currency, goals, actions, isFirstUse, name]) => {
                dispatch({ type: 'SET_CURRENCY', currency: currency });
                dispatch({ type: 'SET_GOALS', goals: goals });
                dispatch({ type: 'SET_ACTIONS', actions: actions });
                dispatch({ type: 'SET_NAME', name: name });
                setIsFirstUse(isFirstUse);
                // setTimeout(() => {
                setIsLoaded(true);
                // }, 1500);
            });
    }, [dispatch]);

    return isFirstUse === 'true' ? (
        <RegistrationScreen setIsFirstUse={setIsFirstUse} />
    ) : (
        isLoaded ?
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="GoalInsertion" component={GoalInsertion} />
                    <Stack.Screen name="ActionInsertion" component={ActionInsertion} />
                </Stack.Navigator>
            </NavigationContainer>
            :
            <SafeAreaView style={styles.container}>
                <Text>loading</Text>
            </SafeAreaView>
    )
}

export default ApplicationNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        padding: 10
    },
    text: {
        fontFamily: 'VarelaRound',
        fontSize: 13
    }
});
