import { StyleSheet, Platform, StatusBar } from "react-native";
import { background } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: background
    },
});