import AsyncStorage from '@react-native-async-storage/async-storage';

const getGoals = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('goals');
        return jsonValue !== null ? JSON.parse(jsonValue) : [];
    }
    catch (e) {
        alert("An unknown error occurred.");
        console.log(e.message);
    }
}

const setGoals = async (array) => {
    try {
        await AsyncStorage.setItem('goals', array);
    }
    catch (e) {
        alert("An unknown error occurred.");
        console.log(e.message);
    }
}

const getActions = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('actions');
        return jsonValue !== null ? JSON.parse(jsonValue) : [];
    }
    catch (e) {
        alert("An unknown error occurred.");
        console.log(e.message);
    }
}

const setActions = async (array) => {
    try {
        await AsyncStorage.setItem('actions', array);
    }
    catch (e) {
        alert("An unknown error occurred.");
        console.log(e.message);
    }
}

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        // clear error
    }

    console.log('Done.')
}

export { getGoals, setGoals, setActions, getActions, clearAll };