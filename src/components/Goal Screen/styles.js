import { StyleSheet, Platform, StatusBar } from "react-native";
import { background, primary } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: primary,
        paddingHorizontal: 15,
        marginBottom: 25
    },
    scorllView: {
        paddingHorizontal: 15
    },
    pickerBorder: {
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 6,
        height: 38,
        justifyContent: 'center'
    },
    pickerItem: {
        fontSize: 15,
        fontFamily: 'VarelaRound'
    },
    textInputContainer: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'white',
    },
    textInput: {
        fontFamily: 'VarelaRound',
        textAlign: 'right',
        color: 'black'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        borderRadius: 10,
        height: 38,
        marginTop: 20,
    },
    backButton: {
        marginRight: 5
    },
    error: {
        color: '#eb5030'
    },
    title: {
        fontSize: 18,
        transform: [{ translateY: -1 }]
    },
    text: {
        fontFamily: 'VarelaRound'
    },
    white: {
        color: 'white'
    }
});