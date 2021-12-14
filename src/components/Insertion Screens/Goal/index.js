import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { getGoals, setGoals } from '../../../utils/AsyncStorageHandler';
import { addNewGoal } from '../../../actions/goals';
import { styles } from '../styles';

const GoalInsertion = ({ navigation }) => {

    const [type, setType] = useState('game');
    const sumRef = useRef(null);
    const dispatch = useDispatch();

    const onAddNewGoal = (newGoal) => {
        newGoal.type = type;
        newGoal.date = new Date();
        newGoal.bought = false;
        getGoals().then((storage) => {
            newGoal.id = uuid.v4();
            if (storage.length === 0) { //First insertion
                var arr = [];
                arr.push(newGoal);
                setGoals(JSON.stringify(arr)); //Update AsyncStorage
                dispatch(addNewGoal(newGoal)) //Update store
            }
            else {
                storage.push(newGoal);
                setGoals(JSON.stringify(storage)); //Update AsyncStorage
                dispatch(addNewGoal(newGoal)) //Update store
            }
            setType('game');
            navigation.navigate("Home");
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>הוספת מטרה</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <Formik
                        initialValues={{ name: '', sum: '' }}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            onAddNewGoal(values);
                            resetForm();
                        }}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                            <View>
                                <Picker
                                    selectedValue={type}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setType(itemValue)
                                    }>
                                    <Picker.Item label="משחק" value="game" />
                                    <Picker.Item label="ספר" value="book" />
                                    <Picker.Item label="מכשיר אלקטרוני" value="device" />
                                    <Picker.Item label="אוכל" value="food" />
                                </Picker>
                                <View>
                                    <TextInput
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder="שם המטרה..."
                                        returnKeyType='next'
                                        onSubmitEditing={() => sumRef.current.focus()}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('name')}
                                    />
                                </View>
                                <View>
                                    <TextInput
                                        value={values.sum}
                                        onChangeText={handleChange('sum')}
                                        placeholder="סכום..."
                                        keyboardType='number-pad'
                                        ref={sumRef}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('sum')}
                                    />
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => { handleSubmit(); setErrors({}) }}
                                >
                                    <Text style={{ fontFamily: 'VarelaRound' }}>הוספה</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default GoalInsertion;
