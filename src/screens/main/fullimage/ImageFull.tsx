import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import FullImage from '../../../components/FullImage'

const ImageFull = ({ route, navigation }: any) => {
    const { image } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <FullImage imageUri={image} onBack={() => navigation.goBack()} />
        </View>
    )
}

export default ImageFull