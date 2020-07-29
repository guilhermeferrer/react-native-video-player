import React, { useState, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { Container } from './styles';

import Video from '../../components/Video';
import Loading from '../../components/Loading';
import Controls from '../../components/Controls';

export default function VideoScreen() {
    const [paused, setPause] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReaload] = useState(false);
    const [isFullscreen, setFullscreen] = useState(false);
    const opacity = useSharedValue(0);
    const progress = useSharedValue(0);
    const length = useSharedValue(0);
    const width = useSharedValue(0);
    const timer = useRef();

    function showControls() {
        opacity.value = 1;
        unscheduleFade();
        scheduleFade();
    }

    function hideControls() {
        unscheduleFade();
        opacity.value = 0;
    }

    function scheduleFade() {
        timer.current = setTimeout(() => {
            opacity.value = 0;
        }, 2000);
    }

    function restart() {
        setReaload(false);
        play();
    }

    function play() {
        setPause(false);
        unscheduleFade();
        scheduleFade();
    }

    function pause() {
        setPause(true);
        unscheduleFade();
        scheduleFade();
    }

    function end() {
        unscheduleFade();
        setReaload(true);
        setPause(true);
        opacity.value = 1;
        progress.value = 0;
    }

    function unscheduleFade() {
        clearTimeout(timer.current);
    }

    return (
        <Container {...{ isFullscreen }}>
            <Video {...{ progress, length, paused, setLoading, end }} />
            <Loading {...{ loading }} />
            <Controls
                {...{
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
                    setFullscreen
                }}
            />
        </Container>
    )
}