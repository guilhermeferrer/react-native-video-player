import styled from 'styled-components';
import Animated from 'react-native-reanimated';

export const Container = styled(Animated.View)`
    height: 5px;
    background-color: rgba(255, 255, 255, .5);
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 45px;
    border-radius: 1px;
`;

export const Progress = styled(Animated.View)`
    height: 100%;
    background-color: red;
`;

export const Cursor = styled(Animated.View)`
    height: 15px;
    width: 15px;
    border-radius: 7.5px;
    background-color: red;
    position: absolute;
    top: -5px;
`;