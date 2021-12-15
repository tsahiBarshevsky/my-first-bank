import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import { background, primary } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: primary
    },
    scrollview: {
        backgroundColor: primary,
        height: '100%',
        flexGrow: 1
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        height: 220,
        marginBottom: 15
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    form: {
        backgroundColor: background,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingHorizontal: 20,
        justifyContent: 'center',
        minHeight: Dimensions.get('window').height - 259
    },
    textInputContainer: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        // marginBottom: 10,
        backgroundColor: 'white',
    },
    textInput: {
        fontFamily: 'VarelaRound',
        textAlign: 'right',
        color: 'black',
        width: '100%'
    },
    label: {
        marginBottom: 5,
        fontFamily: 'VarelaRound'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        borderRadius: 10,
        height: 38,
        marginTop: 30,
    },
    error: {
        color: '#eb5030',
    },
    text: {
        fontFamily: 'VarelaRound',
        color: 'white'
    },
    title: {
        fontSize: 20
    }
});