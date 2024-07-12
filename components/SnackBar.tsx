// CustomSnackbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CustomSnackbarProps = {
    message: string;
    color: string;
    onClose: () => void;
};

const CustomSnackbar = ({ message, color, onClose }: CustomSnackbarProps) => {
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>CLOSE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,

    },
    message: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        marginLeft: 20,
    },
    closeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomSnackbar;
