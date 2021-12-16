import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import GoalCard from './Goal Card';
import { styles } from './styles';

const GoalsScreen = () => {

    const goals = useSelector(state => state.goals);

    return goals.length > 0 ? (
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
    ) : (
        <View style={styles.message}>
            <Image
                source={require('../../../assets/e-commerce.png')}
                resizeMode='center'
                style={styles.image}
            />
            <Text style={styles.text}>מטרות שתוסיף תוצגנה כאן</Text>
        </View>
    )
}

export default GoalsScreen;
