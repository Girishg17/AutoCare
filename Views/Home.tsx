import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';
import { RootStackParamList } from '@/types/StackParamTypes';

type HomeProps = {
  navigation: RootStackParamList;
};
export default function Home({ navigation }:HomeProps) {
    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigation.navigate('Signin'); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            {/* Add your content here */}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});
