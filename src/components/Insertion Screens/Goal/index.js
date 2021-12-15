import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { getGoals, setGoals } from '../../../utils/AsyncStorageHandler';
import { addNewGoal } from '../../../actions/goals';
import { GoalSchema } from '../../../utils/GoalSchema';
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
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Feather name="chevron-right" size={20} color="white" />
                </TouchableOpacity>
                <Text style={[styles.text, styles.title, styles.white]}>הוספת מטרה</Text>
            </View>
            <ScrollView
                style={styles.scorllView}
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <Formik
                        initialValues={{ name: '', sum: '' }}
                        enableReinitialize
                        validationSchema={GoalSchema}
                        onSubmit={(values) => onAddNewGoal(values)}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                            <View>
                                <View style={styles.pickerBorder}>
                                    <Picker
                                        selectedValue={type}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setType(itemValue)
                                        }
                                    >
                                        <Picker.Item label="משחק" value="game" style={styles.pickerItem} />
                                        <Picker.Item label="ספר" value="book" style={styles.pickerItem} />
                                        <Picker.Item label="מכשיר אלקטרוני" value="device" style={styles.pickerItem} />
                                        <Picker.Item label="ממתק" value="food" style={styles.pickerItem} />
                                    </Picker>
                                </View>
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder="שם המטרה..."
                                        returnKeyType='next'
                                        onSubmitEditing={() => sumRef.current.focus()}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('name')}
                                        style={styles.textInput}
                                    />
                                </View>
                                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        value={values.sum}
                                        onChangeText={handleChange('sum')}
                                        placeholder="סכום..."
                                        keyboardType='number-pad'
                                        ref={sumRef}
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
                                    <Text style={[styles.text, styles.white]}>הוספה</Text>
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
