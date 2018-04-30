import {AsyncStorage} from 'react-native';

export const setStorageItem = (key, value) => AsyncStorage.setItem(key, value);
export const getStorageItem = key => AsyncStorage.getItem(key);
export const forgetStorageItem = key => AsyncStorage.removeItem(key);

export function getFileExtension(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1);
}

export function getFileName(filename) {
  return filename.substring(filename.lastIndexOf('/') + 1);
}
