import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { setIsFirstUse as updateFirstUse, setName } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const RegistrationSceen = ({ setIsFirstUse }) => {

    const dispatch = useDispatch();

    const onStartApp = (name) => {
        setName(name); // Update AsyncStorage
        dispatch({ type: 'SET_NAME', name: name }); // Update store
        setIsFirstUse('false');
        updateFirstUse();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <Formik
                        initialValues={{ name: '' }}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            onStartApp(values.name);
                            resetForm();
                        }}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                            <View>
                                <View>
                                    <TextInput
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder="שם..."
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('name')}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                    />
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => { handleSubmit(); setErrors({}) }}
                                >
                                    <Text style={{ fontFamily: 'VarelaRound' }}>כניסה</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegistrationSceen
