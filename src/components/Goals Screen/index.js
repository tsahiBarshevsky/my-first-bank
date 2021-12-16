import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import GoalCard from './Goal Card';
import { styles } from './styles';

const GoalsScreen = () => {

    const goals = useSelector(state => state.goals);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            {goals.map((goal) => {
                return (
                    <GoalCard key={goal.id} goal={goal} />
                )
            })}
        </ScrollView>
    )
}

export default GoalsScreen;
