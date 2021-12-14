import AsyncStorage from '@react-native-async-storage/async-storage';

const getCurrency = async () => {
    try {
        const value = await AsyncStorage.getItem('currency');
        return value !== null ? Number(value) : 0;
    }
    catch (e) {
        alert("An unknown error occurred.");
        console.log(e.message);
    }
}

const setCurrency = async (currency) => {
    try {
        await AsyncStorage.setItem('currency', currency);
    }
    catch (e) {
        alert("An unknown error occurred.");
        console.log(e.message);
    }
}

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

const getIsFirstUse = async () => {
    try {
        const firstUse = await AsyncStorage.getItem('firstUse');
        return firstUse !== null ? firstUse : 'true';
    }
    catch (e) {
        alert("An unknown error occurred.");
        console.log(e.message);
    }
}

const setIsFirstUse = async () => {
    try {
        await AsyncStorage.setItem('firstUse', 'false');
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

export {
    getCurrency, setCurrency,
    getGoals, setGoals,
    setActions, getActions,
    getIsFirstUse, setIsFirstUse,
    clearAll
};