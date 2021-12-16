import { StyleSheet } from "react-native";
import { background, primary } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
    },
    contentContainerStyle: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 55
    },
    cardContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftSide: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardType: {
        width: 45,
        height: 45,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#BDBDC6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        marginBottom: 2,
    },
    values: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
    },
    date: {
        fontSize: 12,
        color: '#9e9e9e'
    },
    text: {
        fontFamily: 'VarelaRound'
    }
});