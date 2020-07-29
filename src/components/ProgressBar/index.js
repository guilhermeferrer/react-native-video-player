import React from 'react';
import { Container } from './styles';

import {
    useAnimatedStyle,
    useDerivedValue
} from 'react-native-reanimated';

export default function ProgressBar({ progress, length }) {

    const width = useDerivedValue(() => getProgress(progress, length));

    const style = useAnimatedStyle(() => {
        return {
            width: `${width.value}%`
        };
    });

    function getProgress(value, total) {
        'worklet';
        return (100 * value) / total;
    }

    return (
        <Container onPress={isFullscreen ? portrait : landscape}>
            <Progress {...{ style }} />
        </Container>
    )
} ƒ