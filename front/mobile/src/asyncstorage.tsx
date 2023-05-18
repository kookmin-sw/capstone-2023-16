import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key: string): Promise<string> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : '';
  } catch (e) {
    console.log(`Failed to get data: ${e}`);
    return '';
  }
};


export const storeData = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e: any) {
    console.error(e.message);
  }
};
