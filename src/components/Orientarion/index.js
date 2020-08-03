import React, { useState } from 'react';
import { Container, Icon } from './styles';
import { immersiveModeOn, immersiveModeOff } from 'react-native-android-immersive-mode';
import { lockToLandscape, lockToPortrait } from 'react-native-orientation';
import { withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';

export default function Orientation({ isFullscreen, setFullscreen, opacity }) {
    function landscape() {
        lockToLandscape();
        immersiveModeOn();
        setFullscreen(true);
    }

    function portrait() {
        lockToPortrait();
        immersiveModeOff();
        setFullscreen(false);
    }

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const containerStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, config)
        };
    });

    return (
        <Container style={containerStyle} onPress={isFullscreen ? portrait : landscape}>
            <Icon name={isFullscreen ? 'contract' : 'expand'} />
        </Container>
    )
}