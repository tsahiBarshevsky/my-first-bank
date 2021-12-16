import React, { useState, useRef } from 'react';
import { Alert, View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getActions, setActions, setCurrency } from '../../../utils/AsyncStorageHandler';
import { addNewAction } from '../../../actions/actions';
import { increment, decrement } from '../../../actions/currency';
import { ActionSchema } from '../../../utils/ActionSchema';
import { styles } from '../styles';
import { primary } from '../../../utils/Colors';

const ActionInsertion = ({ navigation }) => {

    const [operation, setOperation] = useState('deposit');
    const [showAlert, setShowAlert] = useState(false);
    const sumRef = useRef(null);
    const dispatch = useDispatch();
    const currency = useSelector(state => state.currency);

    const insertion = (storage, newAction) => {
        if (storage.length === 0) { // First insertion
            var arr = [];
            arr.push(newAction);
            setActions(JSON.stringify(arr)); // Update AsyncStorage
            dispatch(addNewAction(newAction)) // Update store
        }
        else {
            storage.push(newAction);
            setActions(JSON.stringify(storage)); // Update AsyncStorage
            dispatch(addNewAction(newAction)) // Update store
        }
    }

    const onAddNewAction = (newAction) => {
        newAction.operation = operation;
        newAction.date = new Date();
        newAction.bought = false;
        getActions().then((storage) => {
            if (operation === 'deposit') {
                newAction.id = uuid.v4();
                insertion(storage, newAction);
                const uptadedCurrecny = currency + Number(newAction.sum);
                setCurrency(uptadedCurrecny.toString()); // Update AsyncStorage
                dispatch(increment(Number(newAction.sum))); // Update store
                setOperation('deposit');
                navigation.navigate("Home");
            }
            else
                if (currency - Number(newAction.sum) >= 0) {
                    newAction.id = uuid.v4();
                    insertion(storage, newAction);
                    const uptadedCurrecny = currency - Number(newAction.sum);
                    setCurrency(uptadedCurrecny.toString()); // Update AsyncStorage
                    dispatch(decrement(Number(newAction.sum))); // Update store
                    setOperation('deposit');
                    navigation.navigate("Home");
                }
                else
                    setShowAlert(true);
        });
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
                <Text style={[styles.text, styles.title, styles.white]}>הוספת פעולה</Text>
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
                        initialValues={{ reason: '', sum: '' }}
                        enableReinitialize
                        validationSchema={ActionSchema}
                        onSubmit={(values) => onAddNewAction(values)}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                            <View>
                                <View style={styles.pickerBorder}>
                                    <Picker
                                        selectedValue={operation}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setOperation(itemValue)
                                        }
                                    >
                                        <Picker.Item label="הפקדה" value="deposit" style={styles.pickerItem} />
                                        <Picker.Item label="משיכה" value="withdrawal" style={styles.pickerItem} />
                                    </Picker>
                                </View>
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        value={values.reason}
                                        onChangeText={handleChange('reason')}
                                        placeholder="סיבה..."
                                        returnKeyType='next'
                                        onSubmitEditing={() => sumRef.current.focus()}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('reason')}
                                        style={styles.textInput}
                                    />
                                </View>
                                {touched.reason && errors.reason && <Text style={styles.error}>{errors.reason}</Text>}
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
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="שגיאה!"
                titleStyle={{ fontFamily: 'VarelaRound' }}
                message={`אין לך מספיק כסף כדי לבצע את המשיכה הזאת. יתרה נוכחית: ${currency}.`}
                messageStyle={{ fontFamily: 'VarelaRound' }}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="בסדר"
                confirmButtonTextStyle={{ fontFamily: 'VarelaRound' }}
                confirmButtonStyle={{ width: 70, alignItems: 'center', borderRadius: 10 }}
                confirmButtonColor={primary}
                onConfirmPressed={() => setShowAlert(false)}
            />
        </SafeAreaView>
    )
}

export default ActionInsertion;
