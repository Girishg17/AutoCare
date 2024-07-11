import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RootStackParamList } from '../types/StackParamTypes';  // Replace with your actual types

type SignUpProps = {
  navigation: RootStackParamList;
};

export default function SignUpScreen({ navigation }: SignUpProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/background.png')}
                style={styles.background}
            />
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.card}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.signinContainer}>
                    <Text style={styles.signinText}>
                        Already have an account?{' '}
                        <Text style={styles.signinLink} onPress={() => navigation.navigate('Signin')}>
                            Sign In
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff', // Text color for title
    },
    card: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 20,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333', // Text color for labels
    },
    input: {
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd', // Border color for inputs
        color: '#333', // Text color for inputs
        paddingLeft: 10,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#00BFFF', // Button background color
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff', // Button text color
        fontSize: 16,
    },
    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signinText: {
        fontSize: 14,
        color: '#333', // Text color for sign in message
    },
    signinLink: {
        fontSize: 14,
        color: '#00BFFF', // Link color for sign in text
        fontWeight: 'bold',
    },
});
