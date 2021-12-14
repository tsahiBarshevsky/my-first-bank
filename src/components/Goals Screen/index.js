import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNewGoal, purchaseGoal } from '../../actions/goals';
import { clearAll } from '../../utils/AsyncStorageHandler';

const GoalsScreen = () => {

    const dispatch = useDispatch();
    const goals = useSelector(state => state.goals);

    const onPurchaseGoal = (goal) => {
        goal.bought = true;
        dispatch(purchaseGoal(0, goal));
    }

    return (
        <View>
            <Button onPress={() => dispatch(addNewGoal({ name: 'מטרה 2', bought: false }))} title='add' />
            {goals.map((goal, index) => {
                return (
                    <View key={index}>
                        <Text>{goal.name}</Text>
                        <Text>{goal.bought ? 'נקנה' : 'לא נקנה'}</Text>
                        <Text>{typeof goal.bought}</Text>
                        <Button onPress={() => onPurchaseGoal(goal)} title='סמן כנקנה' />
                        <Button onPress={() => console.log(goal)} title='הדפס' />
                    </View>
                )
            })}
        </View>
    )
}

export default GoalsScreen;
