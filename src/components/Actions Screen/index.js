import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ActionsScreen = () => {

    const dispatch = useDispatch();
    const actions = useSelector(state => state.actions);
    // console.log("actions:", actions);

    return (
        <View>
            {actions.map((action) => {
                return (
                    <View key={action.id} style={{ marginBottom: 10, borderBottomWidth: 2 }}>
                        <Text>{action.sum}</Text>
                        <Text>{action.reason}</Text>
                        <Text>{action.operation}</Text>
                        <Text>{moment(action.date).format('DD/MM/YY')}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default ActionsScreen;
