import { View, Pressable } from 'react-native';
import React from 'react';
import BackArrowIcon from '../assets/icons/BackArrow';

const ArrowComponent = ({ onPress }: any) => {
    return (
        <Pressable
            android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: true }}
            style={{
                width: 25,
                height: 20,
                borderRadius: 25,
                // backgroundColor: 'rgba(128, 128, 128, 0.6)', 
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <BackArrowIcon width={40} height={30}  />
        </Pressable>
    );
};

export default ArrowComponent;
