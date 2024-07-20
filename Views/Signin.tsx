import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/StackParamTypes';
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import firebaseapp from '../Firebase/firebase'
import CustomSnackbar from '../components/SnackBar';

type SignInProps = {
    navigation: RootStackParamList;
};

export default function Signin({ navigation }: SignInProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ message: '', color: '', visible: false });
    const handleSignIn = () => {
        const auth = getAuth(firebaseapp);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error)
                setSnackbar({ message: 'EmailId & Password did not match', color: 'orange', visible: true });
                setTimeout(() => {
                    setSnackbar({ ...snackbar, visible: false });
                }, 2000);
            });

    }
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, visible: false });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/background.png')}
                style={styles.background}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/userprofile.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            keyboardType='email-address'
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
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>
                            Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
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
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 120,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        marginTop: 20,
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
    signupContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    signupText: {
        fontSize: 14,
        color: '#333',
    },
    signupLink: {
        fontSize: 14,
        color: '#00BFFF',
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
