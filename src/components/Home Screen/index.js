import React from 'react';
import { View, useWindowDimensions, Button, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { clearAll } from '../../utils/AsyncStorageHandler';
import GoalsScreen from '../Goals Screen';
import ActionsScreen from '../Actions Screen';
import { styles } from './styles';
import { primary } from '../../utils/Colors';
import { StatusBar } from 'expo-status-bar';

const renderScene = SceneMap({
    actions: ActionsScreen,
    goals: GoalsScreen
});

const HomeScreen = ({ navigation }) => {

    const name = useSelector(state => state.name);
    const currency = useSelector(state => state.currency);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'actions', title: 'עובר ושב' },
        { key: 'goals', title: 'המטרות שלי' },
    ]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={primary} style='light' />
            <View style={styles.header}>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>היי, {name}!</Text>
                    <Text style={styles.text}>יש ברשותך {currency}₪</Text>
                </View>
            </View>
            <Button onPress={() => navigation.navigate("ActionInsertion")} title='הוסף פעולה' />
            <Button onPress={() => navigation.navigate("GoalInsertion")} title='הוסף מטרה' />
            <Button onPress={() => clearAll()} title='נקה' />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) =>
                    <TabBar
                        {...props}
                        style={{ backgroundColor: primary }}
                        tabStyle={{ minHeight: 10 }}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        labelStyle={{ fontFamily: 'VarelaRound' }}
                        pressColor='transparent'
                        inactiveColor='#FFFFFF66'
                    />
                }
            />
        </View>
    )
}

export default HomeScreen;

