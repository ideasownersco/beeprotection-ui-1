import {AsyncStorage} from 'react-native';

export const setStorageItem = (key, value) => AsyncStorage.setItem(key, value);
export const getStorageItem = key => AsyncStorage.getItem(key);
export const forgetStorageItem = key => AsyncStorage.removeItem(key);
