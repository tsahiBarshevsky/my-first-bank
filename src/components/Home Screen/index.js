import React from 'react';
import { View, useWindowDimensions, Button, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import GoalsScreen from '../Goals Screen';
import ActionsScreen from '../Actions Screen';
import { styles } from './styles';

const renderScene = SceneMap({
    actions: ActionsScreen,
    goals: GoalsScreen
});

const HomeScreen = ({ navigation }) => {

    const currency = useSelector(state => state.currency);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'actions', title: 'עובר ושב' },
        { key: 'goals', title: 'מטרות' },
    ]);

    return (
        <View style={styles.container}>
            <Text>יש ברשותך {currency}₪</Text>
            <Button onPress={() => navigation.navigate("ActionInsertion")} title='הוסף פעולה' />
            <Button onPress={() => navigation.navigate("GoalInsertion")} title='הוסף מטרה' />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}

export default HomeScreen;

