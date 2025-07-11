import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import CommonStyles from '../Theme/commonStyles'
type loadingType = {
    size: "large" | "small"
    color: string
}
const Loading = ({ size,color }: loadingType) => {
    return (
        <View style={CommonStyles.centerContainer}>
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}

export default Loading