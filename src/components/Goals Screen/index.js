import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import update from 'immutability-helper';
import { addNewGoal, purchaseGoal } from '../../actions/goals';
import { clearAll, getGoals, setGoals } from '../../utils/AsyncStorageHandler';

const GoalsScreen = () => {

    const dispatch = useDispatch();
    const goals = useSelector(state => state.goals);
    // console.log("goals:", goals);

    const onPurchaseGoal = (goal) => {
        const index = goals.findIndex(currentGoal => currentGoal.id === goal.id);
        getGoals().then((storage) => {
            const updated = update(storage, { [index]: { $merge: { bought: true } } });
            setGoals(JSON.stringify(updated)); // Update AsyncStorage
            dispatch(purchaseGoal(index, goal)); // Update store
        });
    }

    return (
        <View>
            {/* <Button onPress={() => clearAll()} title='נקה' /> */}
            {goals.map((goal) => {
                return (
                    <View key={goal.id} style={{ marginBottom: 10, borderBottomWidth: 2 }}>
                        <Text>{goal.name}</Text>
                        <Text>{goal.bought ? 'נקנה' : 'לא נקנה'}</Text>
                        <Button onPress={() => onPurchaseGoal(goal)} title='סמן כנקנה' />
                        <Button onPress={() => console.log(goal)} title='הדפס' />
                    </View>
                )
            })}
        </View>
    )
}

export default GoalsScreen;
