import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';
import { RootStackParamList } from '@/types/StackParamTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function Home({ navigation }: HomeProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error signing out. Please try again.');
    }
  };

  const navigateToServices = () => {
    navigation.navigate('Services');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.header, opacity: fadeAnim }}>
        <Text style={styles.title}>AutoCare</Text>
      </Animated.View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <Text style={styles.welcomeText}>Welcome to AutoCare</Text>
        <Button title="Go to Services" onPress={navigateToServices} color="#4CAF50" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f44336',
    borderRadius: 20,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
