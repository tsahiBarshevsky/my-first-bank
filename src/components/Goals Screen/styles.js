import { StyleSheet } from "react-native";
import { background, primary } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingHorizontal: 10,
        paddingVertical: 20,
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
        marginTop: 2
    },
    cardType: {
        width: 40,
        height: 40,
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
        fontSize: 15,
    },
    date: {
        fontSize: 10,
        color: '#9e9e9e'
    },
    text: {
        fontFamily: 'VarelaRound'
    }
});