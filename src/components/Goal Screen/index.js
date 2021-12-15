import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';
import { GoalSchema } from '../../utils/GoalSchema';
import { updateGoal } from '../../actions/goals';
import { setGoals } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const GoalScreen = ({ navigation, route }) => {

    const [goal, setGoal] = useState({});
    const [type, setType] = useState('game');
    const dispatch = useDispatch();
    const goals = useSelector(state => state.goals);
    const sumRef = useRef(null);
    const { id } = route.params;

    const onEditGoal = (updatedValues) => {
        updatedValues.type = type;
        const index = goals.findIndex(goal => goal.id === id);
        const temp = goals;
        setGoals(JSON.stringify(update(temp, {
            [index]: {
                $merge: {
                    type: type,
                    name: updatedValues.name,
                    sum: updatedValues.sum
                }
            }
        })));
        dispatch(updateGoal(index, type, updatedValues.name, updatedValues.sum));
        navigation.navigate('Home');
    }

    useEffect(() => {
        const currentGoal = goals.find(goal => goal.id === id);
        setGoal(currentGoal);
        setType(currentGoal.type);
    }, [goals]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Feather name="chevron-right" size={20} color="white" />
                </TouchableOpacity>
                <Text style={[styles.text, styles.title, styles.white]}>עריכת מטרה</Text>
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
                        initialValues={{ name: goal.name, sum: goal.sum }}
                        enableReinitialize
                        validationSchema={GoalSchema}
                        onSubmit={(values) => onEditGoal(values)}
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
                                    <Text style={[styles.text, styles.white]}>שמירה ועדכון</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default GoalScreen;
