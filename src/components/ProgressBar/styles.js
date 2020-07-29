import styled from 'styled-components';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
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