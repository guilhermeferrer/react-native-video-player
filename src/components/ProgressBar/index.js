import React from 'react';
import { Container, Progress } from './styles';

import {
    useAnimatedStyle,
    useDerivedValue
} from 'react-native-reanimated';

export default function ProgressBar({ progress, length }) {

    function getProgress(value, total) {
        'worklet';
        return (100 * value) / total;
    }

    const width = useDerivedValue(() => {
        return getProgress(progress.value, length.value);
    });

    const style = useAnimatedStyle(() => {
        return {
            width: `${width.value}%`
        };
    });

    return (
        <Container>
            <Progress {...{ style }} />
        </Container>
    )
}