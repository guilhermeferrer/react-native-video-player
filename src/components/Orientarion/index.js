import React, { useState } from 'react';
import { Container, Icon } from './styles';
import { immersiveModeOn, immersiveModeOff } from 'react-native-android-immersive-mode';

export default function Orientation() {
    const [isFullscreen, setFullscreen] = useState(false);

    function portrait() {
        lockToLandscape();
        immersiveModeOn();
        setFullscreen(false);
    }

    function landscape() {
        lockToPortrait();
        immersiveModeOff();
        setFullscreen(true);
    }

    return (
        <Container onPress={isFullscreen ? portrait : landscape}>
            <Icon name={isFullscreen ? 'contract' : 'expand'} />
        </Container>
    )
} ƒ