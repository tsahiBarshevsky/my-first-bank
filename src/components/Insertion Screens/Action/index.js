import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { getActions, setActions } from '../../../utils/AsyncStorageHandler';
import { addNewAction } from '../../../actions/actions';
import { styles } from '../styles';

const ActionInsertion = ({ navigation }) => {

    const [operation, setOperation] = useState('deposit');
    const sumRef = useRef(null);
    const dispatch = useDispatch();

    const onAddNewAction = (newAction) => {
        newAction.operation = operation;
        newAction.date = new Date();
        newAction.bought = false;
        getActions().then((storage) => {
            newAction.id = uuid.v4();
            if (storage.length === 0) { //First insertion
                var arr = [];
                arr.push(newAction);
                setActions(JSON.stringify(arr)); //Update AsyncStorage
                dispatch(addNewAction(newAction)) //Update store
            }
            else {
                storage.push(newAction);
                setActions(JSON.stringify(storage)); //Update AsyncStorage
                dispatch(addNewAction(newAction)) //Update store
            }
            setOperation('deposit');
            navigation.navigate("Home");
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>הוספת פעולה</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <Formik
                        initialValues={{ reason: '', sum: '' }}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            onAddNewAction(values);
                            resetForm();
                        }}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                            <View>
                                <Picker
                                    selectedValue={operation}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setOperation(itemValue)
                                    }>
                                    <Picker.Item label="הפקדה" value="deposit" />
                                    <Picker.Item label="משיכה" value="withdrawal" />
                                </Picker>
                                <View>
                                    <TextInput
                                        value={values.reason}
                                        onChangeText={handleChange('reason')}
                                        placeholder="סיבה..."
                                        returnKeyType='next'
                                        onSubmitEditing={() => sumRef.current.focus()}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('reason')}
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

export default ActionInsertion;
