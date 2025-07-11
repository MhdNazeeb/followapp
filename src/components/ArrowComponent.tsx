import { Platform, TouchableNativeFeedback, View, Pressable } from 'react-native';
import React from 'react';
import BackArrowIcon from '../assets/icons/BackArrow';
import { TouchableRipple } from 'react-native-paper';
import { Haptics } from '../utils/Haptics';

const ArrowComponent = ({ onPress }: any) => {
    return (
        <View
            style={{
                borderRadius: 20,
                overflow: 'hidden',
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(128,128,128,0.08)',
            }}
        >
            <TouchableRipple
                onPress={() => {
                    Haptics.heavy()
                    onPress()

                }


                }
                rippleColor={'#808080'}
                borderless={false} 
                style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                }}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 20 }}>
                    <BackArrowIcon width={24} height={24} />
                </View>
            </TouchableRipple>
        </View>
    );
}

export default ArrowComponent;
