import React, { useState } from 'react';
import { Container, Icon } from './styles';
import { immersiveModeOn, immersiveModeOff } from 'react-native-android-immersive-mode';
import { lockToLandscape, lockToPortrait } from 'react-native-orientation';

export default function Orientation({ isFullscreen, setFullscreen }) {
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

    return (
        <Container onPress={isFullscreen ? portrait : landscape}>
            <Icon name={isFullscreen ? 'contract' : 'expand'} />
        </Container>
    )
}