import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import update from 'immutability-helper';
import uuid from 'react-native-uuid';
import { purchaseGoal } from '../../actions/goals';
import { getActions, getGoals, setActions, setGoals, setCurrency } from '../../utils/AsyncStorageHandler';
import { addNewAction } from '../../actions/actions';
import { decrement } from '../../actions/currency';

const GoalsScreen = () => {

    const dispatch = useDispatch();
    const goals = useSelector(state => state.goals);
    const currency = useSelector(state => state.currency);
    // console.log("goals:", goals);

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
        });
    }

    return (
        <ScrollView>
            {goals.map((goal) => {
                return (
                    <View key={goal.id} style={{ marginBottom: 10, borderBottomWidth: 2 }}>
                        <Text>{goal.name} עולה {goal.sum}</Text>
                        <Text>הושגו {currency} מתוך {goal.sum}</Text>
                        <Text>{goal.bought ? 'נקנה' : 'לא נקנה'}</Text>
                        {Number(goal.sum) <= currency && !goal.bought &&
                            <Button onPress={() => onPurchaseGoal(goal)} title='סמן כנקנה' />
                        }
                        {/* <Button onPress={() => console.log(goal)} title='הדפס' /> */}
                    </View>
                )
            })}
        </ScrollView>
    )
}

export default GoalsScreen;
