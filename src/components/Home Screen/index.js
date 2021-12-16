import React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { FloatingAction } from "react-native-floating-action";
import { actions } from '../../utils/MenuActions';
import GoalsScreen from '../Goals Screen';
import ActionsScreen from '../Actions Screen';
import { styles } from './styles';
import { primary } from '../../utils/Colors';

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

    const onItemPressed = (target) => {
        if (target === 'bt_target')
            navigation.navigate("GoalInsertion");
        else
            navigation.navigate("ActionInsertion");
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={primary} style='light' />
            <View style={styles.header}>
                <View style={styles.textWrapper}>
                    <Text style={[styles.text, styles.title]}>היי {name}!</Text>
                    <Text style={[styles.text, styles.subtitle]}>יש ברשותך {currency}₪</Text>
                </View>
            </View>
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
            <FloatingAction
                actions={actions}
                onPressItem={target => onItemPressed(target)}
                color={primary}
                overlayColor="rgba(69, 69, 69, 0.9)"
                buttonSize={45}
                position='left'
                distanceToEdge={10}
                actionsPaddingTopBottom={2}
            />
        </View>
    )
}

export default HomeScreen;

