import styled from 'styled-components';
import Animated from 'react-native-reanimated';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const SeekButton = styled(Animated.View)`
    width: 65px;
    height: 65px;
    justify-content: center;
    align-items: center;
`;

export const Next = styled(IonIcon)`
    color: white;
    font-size: 40px;
    position: absolute;
    top: 8px;
    left: 14px;
`;

export const Prev = styled(IonIcon)`
    color: white;
    font-size: 40px;
    position: absolute;
    top: 8px;
    left: 12px;
    transform: rotateY(180deg);
`;

export const TimeQuantity = styled(Animated.Text)`
    font-size: 10px;
    color: white;
`;

export const RunText = styled(Animated.Text)`
    font-size: 10px;
    color: white;
    position: absolute;
`;