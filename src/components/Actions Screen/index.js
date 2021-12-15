import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import ActionCard from './Action Card';

const ActionsScreen = () => {

    const actions = useSelector(state => state.actions);

    return (
        <ScrollView style={styles.container}>
            {actions.map((action) => {
                return (
                    <ActionCard key={action.id} action={action} />
                )
            })}
        </ScrollView>
    )
}

export default ActionsScreen;
