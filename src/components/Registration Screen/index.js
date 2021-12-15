import React, { useRef } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { setCurrency, setIsFirstUse as updateFirstUse, setName } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';
import { primary } from '../../utils/Colors';
import { RegistrationSchema } from '../../utils/RegistrationSchema';

const RegistrationScreen = ({ setIsFirstUse }) => {

    const dispatch = useDispatch();
    const sumRef = useRef();

    const onStartApp = (name, sum) => {
        // Update AsyncStorage
        setName(name);
        setCurrency(sum);
        // Update store
        dispatch({ type: 'SET_NAME', name: name });
        dispatch({ type: 'SET_CURRENCY', currency: Number(sum) });
        setIsFirstUse('false');
        updateFirstUse();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={primary} style='light' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollview}
            >
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={styles.header}>
                        <Image style={styles.image} resizeMode='contain' source={require('../../../assets/vector.png')} />
                        <View style={styles.texts}>
                            <Text style={[styles.text, styles.title]}>הבנק הראשון שלי</Text>
                            <Text style={styles.text}>שתי שאלות קצרות ומתחילים</Text>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <Formik
                            initialValues={{ name: '', sum: '' }}
                            enableReinitialize
                            onSubmit={(values) => onStartApp(values.name, values.sum)}
                            validationSchema={RegistrationSchema}
                        >
                            {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                                <View>
                                    <Text style={styles.label}>איך קוראים לך?</Text>
                                    <View style={styles.textInputContainer}>
                                        <TextInput
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            placeholder="השם שלך..."
                                            blurOnSubmit={false}
                                            onBlur={handleBlur('name')}
                                            returnKeyType='next'
                                            onSubmitEditing={() => sumRef.current.focus()}
                                            style={styles.textInput}
                                        />
                                    </View>
                                    {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                                    <Text style={[styles.label, { marginTop: 10 }]}>כמה כסף יש לך?</Text>
                                    <View style={styles.textInputContainer}>
                                        <TextInput
                                            value={values.sum}
                                            onChangeText={handleChange('sum')}
                                            ref={sumRef}
                                            placeholder="החסכונות שלך..."
                                            keyboardType='number-pad'
                                            blurOnSubmit={false}
                                            onBlur={handleBlur('sum')}
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                            style={styles.textInput}
                                        />
                                    </View>
                                    {touched.sum && errors.sum && <Text style={styles.error}>{errors.sum}</Text>}
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => { handleSubmit(); setErrors({}) }}
                                        style={styles.button}
                                    >
                                        <Text style={[styles.text]}>כניסה</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegistrationScreen;
