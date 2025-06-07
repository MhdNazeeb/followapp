import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Save data to AsyncStorage
 * @param key - Storage key
 * @param value - Value to store (string or object)
 */
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data to AsyncStorage: ${error}`);
  }
};

/**
 * Get data from AsyncStorage
 * @param key - Storage key
 * @returns Parsed value or null
 */
export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error reading data from AsyncStorage: ${error}`);
    return null;
  }
};

/**
 * Remove a specific item from AsyncStorage
 * @param key - Storage key
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from AsyncStorage: ${error}`);
  }
};

/**
 * Clear all AsyncStorage data
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(`Error clearing AsyncStorage: ${error}`);
  }
};

export const setMultipleItems = async (items: Record<string, any>): Promise<void> => {
    try {
      for (const [key, value] of Object.entries(items)) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      }
    } catch (error) {
      console.error(`Error saving data to AsyncStorage: ${error}`);
    }
  };
  
  // Usage:
    
