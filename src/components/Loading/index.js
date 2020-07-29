import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Container } from './styles';

export default function Loading({ loading }) {
    return loading
        ?
        <Container style={StyleSheet.absoluteFillObject}>
            <ActivityIndicator color="white" size={34} />
        </Container>
        : null;
}