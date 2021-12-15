import moment from 'moment';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';
import { removeAction } from '../../../actions/actions';
import { decrement } from '../../../actions/currency';
import { setActions, setCurrency } from '../../../utils/AsyncStorageHandler';
import { styles } from '../styles';

const ActionCard = ({ action }) => {

    const dispatch = useDispatch();
    const actions = useSelector(state => state.actions);
    const currency = useSelector(state => state.currency);

    const onRemoveAction = () => {
        const index = actions.findIndex(currentAction => currentAction.id === action.id);
        const temp = actions;
        const uptadedCurrecny = currency - Number(action.sum);
        setCurrency(uptadedCurrecny.toString()); // Update AsyncStorage
        setActions(JSON.stringify(update(temp, { $splice: [[index, 1]] }))); // Update AsyncStorage
        dispatch(removeAction(index)); // Update store
        dispatch(decrement(Number(action.sum))); // Update store
    }

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={1}
            onLongPress={() => action.operation === 'deposit' && onRemoveAction()}
        >
            <View style={[styles.operation, action.operation === 'deposit' ? styles.greenBackground : styles.redBackground]} />
            <View style={styles.stats}>
                <View style={styles.sum}>
                    {action.operation === 'deposit' ?
                        <Text style={[styles.text, styles.greenText]}>{action.sum}</Text>
                        :
                        <Text style={[styles.text, styles.redText]}>{action.sum}-</Text>
                    }
                </View>
                <View style={styles.reasonContainer}>
                    <Text style={styles.text}>{action.reason}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.date}>
                        {moment(action.date).format('DD/MM/YY')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ActionCard;
