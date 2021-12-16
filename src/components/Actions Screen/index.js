import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import ActionCard from './Action Card';

const ActionsScreen = () => {

    const actions = useSelector(state => state.actions);

    return actions.length > 0 ? (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            {actions.map((action) => {
                return (
                    <ActionCard key={action.id} action={action} />
                )
            })}
        </ScrollView>
    ) : (
        <View style={styles.message}>
            <Image
                source={require('../../../assets/credit-card-payment.png')}
                resizeMode='center'
                style={styles.image}
            />
            <Text style={styles.text}>הפקדות ומשיכות שתוסיף תוצגנה כאן</Text>
        </View>
    )
}

export default ActionsScreen;
