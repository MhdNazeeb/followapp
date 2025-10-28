import React, { useEffect, useState } from 'react';
import { Platform, Alert, Button, View, Text } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind, IAUInstallStatus } from 'sp-react-native-in-app-updates';

const InAppUpdate = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const inAppUpdates = new SpInAppUpdates(false); // false = not in debug mode

    useEffect(() => {
        checkForUpdates();
    }, []);

    const checkForUpdates = async () => {
        try {
            const result = await inAppUpdates.checkNeedsUpdate();
            if (result.shouldUpdate) {
                setUpdateAvailable(true);
            }
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    };

    const startUpdate = async () => {
        try {
            let updateOptions = {};
            if (Platform.OS === 'android') {
                updateOptions = { updateType: IAUUpdateKind.FLEXIBLE };
                inAppUpdates.addStatusUpdateListener((downloadStatus) => {
                    if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
                        inAppUpdates.installUpdate();
                        inAppUpdates.removeStatusUpdateListener(() => { });
                        setUpdateAvailable(false);
                    }
                });
            } else if (Platform.OS === 'ios') {
                updateOptions = {
                    title: 'Update Available',
                    message: 'A new version of the app is available. Would you like to update now?',
                    buttonUpgradeText: 'Update',
                    buttonCancelText: 'Cancel',
                };
            }
            await inAppUpdates.startUpdate(updateOptions);
            if (Platform.OS === 'ios') {
                setUpdateAvailable(false);
            }
        } catch (error) {
            console.error('Error starting update:', error);
            Alert.alert('Update Error', 'Failed to start the update. Please try again later.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {updateAvailable && (
                <>
                    <Text>A new version of the app is available!</Text>
                    <Button title="Download Update" onPress={startUpdate} />
                </>
            )}
        </View>
    );
};

export default InAppUpdate;