import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'

const { width, height } = Dimensions.get('window')

const FullImage = ({ imageUri, onBack }: any) => {

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar barStyle="light-content" backgroundColor="gray" /> */}

            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
            </View>
            {/* Full screen image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUri || 'https://picsum.photos/800/600' }}
                    style={styles.fullImage}
                    resizeMode="contain"
                />
            </View>

            {/* Optional bottom controls */}
            <View style={styles.bottomControls}>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlButtonText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: width,
        height: height,
    },
    bottomControls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingBottom: 20,
    },
    controlButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
    },
    controlButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

})

export default FullImage