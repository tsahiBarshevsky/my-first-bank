import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import HomeScreen from './components/Home Screen';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const [isFirstUse, setIsFirstUse] = useState(false);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     Fetching data from AsyncStorage
    //     Promise.all([
    //         getCourses(),
    //         getFailure(),
    //         getIsFirstUse()
    //     ])
    //         .then(([courses, failure, isFirstUse]) => {
    //             dispatch({ type: 'SET_COURSES', courses: courses });
    //             if (failure !== null)
    //                 dispatch({ type: 'SET_SCORE', score: failure });
    //             setTimeout(() => {
    //                 setIsLoaded(true);
    //             }, 1500);
    //             setIsFirstUse(isFirstUse);
    //         });
    // }, [dispatch]);

    return isFirstUse === 'true' ? (
        null
    ) : (
        isLoaded ?
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
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
