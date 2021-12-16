import { StyleSheet } from "react-native";
import { background, green, red } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
    },
    contentContainerStyle: {
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 55
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        height: 45
    },
    operation: {
        width: 6,
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    stats: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    sum: {
        flex: 1,
        alignItems: 'center',
    },
    reasonContainer: {
        flex: 4.5,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderRightWidth: 1,
        borderRightColor: 'grey',
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
    },
    greenText: {
        color: green,
    },
    redText: {
        color: red,
    },
    greenBackground: {
        backgroundColor: green,
    },
    redBackground: {
        backgroundColor: red,
    },
    text: {
        fontFamily: 'VarelaRound'
    },
    date: {
        fontSize: 10,
        color: '#757575'
    }
});