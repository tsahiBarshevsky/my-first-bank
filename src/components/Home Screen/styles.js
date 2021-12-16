import { StyleSheet, Platform, StatusBar } from "react-native";
import { background, primary } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: background
    },
    header: {
        height: 120,
        backgroundColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    textWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF33',
    },
    text: {
        color: 'white',
        fontFamily: 'VarelaRound',
    },
    title: {
        fontSize: 25
    },
    subtitle: {
        fontSize: 20
    }
});