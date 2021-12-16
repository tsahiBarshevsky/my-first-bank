import React from 'react';
import moment from 'moment';
import { View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { purchaseGoal, removeGoal } from '../../../actions/goals';
import { getActions, getGoals, setActions, setGoals, setCurrency } from '../../../utils/AsyncStorageHandler';
import { addNewAction } from '../../../actions/actions';
import { decrement } from '../../../actions/currency';
import { styles } from '../styles';
import { primary } from '../../../utils/Colors';

const GoalCard = ({ goal }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const goals = useSelector(state => state.goals);
    const currency = useSelector(state => state.currency);

    const onRemoveGoal = () => {
        const index = goals.findIndex(currentGoal => currentGoal.id === goal.id);
        const temp = goals;
        setGoals(JSON.stringify(update(temp, { $splice: [[index, 1]] }))); // Update AsyncStorage
        dispatch(removeGoal(index)); // Update store
    }

    const onPurchaseGoal = (goal) => {
        const index = goals.findIndex(currentGoal => currentGoal.id === goal.id);
        getGoals().then((storage) => {
            const updated = update(storage, { [index]: { $merge: { bought: true } } });
            const action = {
                reason: goal.name,
                sum: goal.sum,
                operation: 'withdrawal',
                date: new Date(),
                id: uuid.v4()
            };
            // Update AsyncStorage
            setGoals(JSON.stringify(updated));
            const uptadedCurrecny = currency - Number(goal.sum);
            setCurrency(uptadedCurrecny.toString());
            getActions().then((storage) => {
                storage.push(action);
                setActions(JSON.stringify(storage));
            });
            // Update store
            dispatch(purchaseGoal(index, goal));
            dispatch(decrement(Number(goal.sum)))
            dispatch(addNewAction(action));
            ToastAndroid.show(`${goal.name} סומן כנקנה`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        });
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <View style={styles.rightSide}>
                    <View style={styles.cardType}>
                        {(() => {
                            switch (goal.type) {
                                case 'game':
                                    return <FontAwesome name="gamepad" size={24} color={primary} />;
                                case 'book':
                                    return <Entypo name="open-book" size={24} color={primary} />;
                                case 'device':
                                    return <FontAwesome5 name="laptop" size={18} color={primary} />;
                                case 'food':
                                    return <FontAwesome5 name="candy-cane" size={20} color={primary} />;
                                default:
                                    return <Text>{goal.type}</Text>;
                            }
                        })()}
                    </View>
                    <View style={{ transform: [{ translateY: -1 }] }}>
                        <Text style={[styles.text, styles.title]}>{goal.name}</Text>
                        <Text style={[styles.text, styles.date]}>{moment(goal.date).format('DD/MM/YY')}</Text>
                    </View>
                </View>
                <View style={styles.leftSide}>
                    {/* Purchase button */}
                    {Number(goal.sum) <= currency && !goal.bought &&
                        <TouchableOpacity
                            onPress={() => onPurchaseGoal(goal)}
                            activeOpacity={0.8}
                        >
                            <Feather name="check" size={23} color={primary} />
                        </TouchableOpacity>
                    }
                    {/* Edit button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('GoalScreen', { id: goal.id })}
                        activeOpacity={0.8}
                        style={{ marginHorizontal: 3 }}
                    >
                        <MaterialIcons name="edit" size={19} color={primary} />
                    </TouchableOpacity>
                    {/* Remove button */}
                    <TouchableOpacity
                        onPress={() => onRemoveGoal()}
                        activeOpacity={0.8}
                    >
                        <MaterialCommunityIcons name="delete" size={20} color={primary} />
                    </TouchableOpacity>
                </View>
            </View>
            <Progress.Bar
                progress={!goal.bought ? currency / Number(goal.sum) : 1}
                width={null}
                style={styles.progress}
                color={primary}
                unfilledColor='#e0e0e0'
                height={8}
                borderRadius={10}
            />
            <View style={styles.values}>
                {goal.bought ?
                    <Text style={styles.text}>{goal.sum}₪</Text>
                    :
                    <Text style={styles.text}>{Number(goal.sum) >= currency ? currency : goal.sum}₪</Text>
                }
                <Text style={styles.text}>{goal.sum}₪</Text>
            </View>
        </View>
    )
}

export default GoalCard;
