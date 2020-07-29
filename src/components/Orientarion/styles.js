import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const Container = styled(RectButton)`
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(IonIcon)`
    color: white;
    font-size: 22px;
`;