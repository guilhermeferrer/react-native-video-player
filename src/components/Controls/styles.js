import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const Container = styled(Animated.View)``;

export const Button = styled(Animated.View)`
    width: 65px;
    height: 65px;
    justify-content: center;
    align-items: center;
`;

export const Controls = styled(Animated.View)`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(IonIcon)`
    color: white;
`;

export const Row = styled.View`
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;