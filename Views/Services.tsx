import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';

type LocationData = {
  business_id: string;
  phone_number: string;
  name: string;
  full_address: string;
  latitude: number;
  longitude: number;
  review_count: number;
  rating: number;
  timezone: string;
  website: string;
  place_link: string;
  types: string[];
  price_level: string;
  working_hours: string[];
  state: string;
  description: string[];
};

type ServicesProps = {
  navigation: any;
};

const TRUEWAY_API_KEY = '962e77fc53mshe279f24c65015d5p1e709fjsndc999af4181a';

const Services: React.FC<ServicesProps> = ({ navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [mileage, setMileage] = useState<string>('');
  const [fuelLeft, setFuelLeft] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [query, setQuery] = useState<string>('');
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 50,
        },
        newLocation => {
          setLocation(newLocation);
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (destination && location) {
      mapRef.current?.fitToCoordinates(
        [
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          destination,
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );

      fetchDistance(location.coords.latitude, location.coords.longitude, destination.latitude, destination.longitude);
    }
  }, [destination, location]);

  const fetchDistance = async (originLat: number, originLng: number, destLat: number, destLng: number) => {
    try {
      const response = await axios.get('https://trueway-directions2.p.rapidapi.com/FindDrivingPath', {
        headers: {
          'x-rapidapi-key': TRUEWAY_API_KEY,
          'x-rapidapi-host': 'trueway-directions2.p.rapidapi.com',
        },
        params: {
          origin: `${originLat},${originLng}`,
          destination: `${destLat},${destLng}`,
        },
      });

      const { distance, duration } = response.data.route;
      setDistance(distance);
      setDuration(duration);
    } catch (error) {
      console.error('Error fetching distance:', error);
      Alert.alert('Error fetching distance. Please try again later.');
    }
  };

  const fetchNearbyLocations = async (latitude: number, longitude: number, radius: number) => {
    try {
      const response = await axios.get(`https://maps-data.p.rapidapi.com/nearby.php`, {
        headers: {
          'x-rapidapi-key': '962e77fc53mshe279f24c65015d5p1e709fjsndc999af4181a',
          'x-rapidapi-host': 'maps-data.p.rapidapi.com',
        },
        params: {
          query,
          lat: latitude,
          lng: longitude,
          limit: 20,
          country: 'us',
          lang: 'en',
          offset: radius,
          zoom: 12,
        },
      });

      const filteredLocations = response.data.data.filter((location: LocationData) => {
        const distanceToLocation = calculateDistance(latitude, longitude, location.latitude, location.longitude);
        return distanceToLocation <= radius;
      });

      setLocations(filteredLocations || []);
    } catch (error) {
      console.error(`Error fetching nearby ${query}s:`, error);
      Alert.alert(`Error fetching nearby ${query}s. Please try again later.`);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const handleCenterOnLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert('Error getting current location. Please try again.');
    }
  };

  const handleFindLocations = () => {
    if (!mileage || !fuelLeft || !location) {
      Alert.alert('Please enter car mileage, fuel left and ensure location is available.');
      return;
    }

    const mileageNum = parseFloat(mileage);
    const fuelLeftNum = parseFloat(fuelLeft);

    if (isNaN(mileageNum) || isNaN(fuelLeftNum)) {
      Alert.alert('Please enter valid numbers for mileage and fuel left.');
      return;
    }

    const range = mileageNum * fuelLeftNum * 1.60934 * 1000; // Convert miles to meters
    fetchNearbyLocations(location.coords.latitude, location.coords.longitude, range);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 13.8629,
          longitude: location?.coords.longitude || 74.6923,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        )}
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={location.full_address}
            pinColor="orange"
            onPress={() => setDestination({ latitude: location.latitude, longitude: location.longitude })}
          />
        ))}
      </MapView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Car Mileage (miles per gallon)"
          keyboardType="numeric"
          value={mileage}
          onChangeText={setMileage}
        />
        <TextInput
          style={styles.input}
          placeholder="Fuel Left (gallons)"
          keyboardType="numeric"
          value={fuelLeft}
          onChangeText={setFuelLeft}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Query (e.g. petrol bunk, service center, restaurant)"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Find Locations" onPress={handleFindLocations} color="#4CAF50" />
      </View>
      {distance !== null && duration !== null && (
        <View style={styles.infoContainer}>
          <Text>Distance: {distance} meters</Text>
          <Text>Duration: {Math.round(duration / 60)} minutes</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Center on Location" onPress={handleCenterOnLocation} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default Services;
