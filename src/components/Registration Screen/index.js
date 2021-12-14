import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { setIsFirstUse as updateFirstUse } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const RegistrationSceen = ({ setIsFirstUse }) => {

    const onStartApp = () => {
        setIsFirstUse('false');
        updateFirstUse();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>הרשמה</Text>
            <Button onPress={() => onStartApp()} title='היכנס' />
        </SafeAreaView>
    )
}

export default RegistrationSceen
