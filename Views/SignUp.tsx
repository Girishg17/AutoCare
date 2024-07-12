import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RootStackParamList } from '../types/StackParamTypes';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import firebaseapp from '../Firebase/firebase'
import CustomSnackbar from '../components/SnackBar';

type SignUpProps = {
    navigation: RootStackParamList;
};

export default function SignUpScreen({ navigation }: SignUpProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ message: '', color: '', visible: false });
    const handleSignUp = async () => {
        const auth = getAuth(firebaseapp);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSnackbar({ message: 'Sign up successful!', color: 'green', visible: true });
                setTimeout(() => {

                    navigation.navigate('Signin');
                    setSnackbar({ ...snackbar, visible: false });

                }, 3000);

            })
            .catch((error) => {
                //error handle
                // ..
                setSnackbar({ message: 'There was error while SignUp!', color: 'red', visible: true });
                throw (error);

            });
    };
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, visible: false });
    };

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
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText} >Sign Up</Text>
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
            {snackbar.visible && (
                <CustomSnackbar
                    message={snackbar.message}
                    color={snackbar.color}
                    onClose={handleCloseSnackbar}
                />
            )}
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
        color: '#fff', 
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
        color: '#333', 
    },
    input: {
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd', 
        color: '#333', 
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
        color: '#fff', 
        fontSize: 16,
    },
    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signinText: {
        fontSize: 14,
        color: '#333',
    },
    signinLink: {
        fontSize: 14,
        color: '#00BFFF', 
        fontWeight: 'bold',
    },
});
