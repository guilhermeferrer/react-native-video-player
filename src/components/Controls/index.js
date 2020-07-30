import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Container, Controls, Button, Icon, Row } from './styles';

import Orientarion from '../Orientarion';
import ProgressBar from '../ProgressBar';
import SeekButton from '../SeekButton';

export default function ControlView({
    opacity,
    progress,
    length,
    paused,
    loading,
    play,
    pause,
    reload,
    restart,
    hideControls,
    showControls,
    isFullscreen,
    setFullscreen,
    forward10Sec,
    backward10Sec
}) {
    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = StyleSheet.absoluteFillObject;

    const styledControl = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, config),
            zIndex: opacity.value === 1 ? 10 : -100
        }
    });

    function renderButton() {
        const name = reload ? 'reload' : paused ? 'play' : 'pause';
        const onPress = reload ? restart : paused ? play : pause;

        return (
            <Button {...{ onPress }}>
                <Icon
                    {...{ name }}
                    size={40}
                />
            </Button>
        )
    }

    return (
        <Container {...{ style }}>
            {!loading &&
                <Controls style={[style, styledControl]}>
                    <TouchableWithoutFeedback onPress={() => {
                        if (opacity.value === 1)
                            hideControls();
                        else
                            showControls();
                    }}>
                        <View {...{ style }} />
                    </TouchableWithoutFeedback>
                    <Row {...{ isFullscreen }}>
                        <SeekButton
                            inverted
                            onPress={backward10Sec}
                        />
                        {renderButton()}
                        <SeekButton
                            onPress={forward10Sec}
                        />
                    </Row>
                    <Orientarion
                        {...{
                            isFullscreen,
                            setFullscreen
                        }}
                    />
                    <ProgressBar {...{ progress, length }} />
                </Controls>
            }
        </Container >
    )
}