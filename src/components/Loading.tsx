import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
type loadingType = {
    size: "large" | "small"
    color: string
}
const Loading = ({ size }: loadingType) => {
    return (
        <View>
            <ActivityIndicator size={size} />
        </View>
    )
}

export default Loading