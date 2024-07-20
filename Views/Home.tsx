import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Animated, FlatList, Image, ImageSourcePropType } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackParamTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { QKIMAGES } from '../Images/Images';

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

type Option = {
  id: number;
  title: string;
  image: ImageSourcePropType;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const data: Option[] = [
    { id: 1, title: 'Map It', image:QKIMAGES.ICON_MAP},
    {id: 2 ,title:'Song',image:QKIMAGES.ICON_AUDIO}
    
  ];

  const [options, setOptions] = useState<Option[]>(data);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const onCardPress = (title: string) => {
    console.log(title);
    if(title=='Map It'){
      navigation.navigate('Services');
      return;
    }
  };
console.log(typeof require('../assets/images/map.png'));
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

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.header, opacity: fadeAnim }}>
        <Text style={styles.title}>AutoCare</Text>
      </Animated.View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={options}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => onCardPress(item.title)}>
              <View style={styles.cardFooter}></View>
              <Image style={styles.cardImage} source={item.image } />
              <View style={styles.cardHeader}>
                <View >
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#f44336',
    borderRadius: 20,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
});

export default Home;
