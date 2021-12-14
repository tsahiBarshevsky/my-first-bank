import React from 'react';
import { Text, View, useWindowDimensions, Button } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import GoalsScreen from '../Goals Screen';
import { styles } from './styles';

const renderScene = SceneMap({
    first: GoalsScreen
});

const HomeScreen = ({ navigation }) => {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'מטרות' },
    ]);

    return (
        <View style={styles.container}>
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

