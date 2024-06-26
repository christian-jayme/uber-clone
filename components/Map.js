
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import tw from "tailwind-react-native-classnames";
import { Icon } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { useEffect, useRef } from "react";
const apiUrl = process.env.EXPO_PUBLIC_API_KEY;

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef =  useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;
        
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: { 
                top: 50, 
                right: 50, 
                bottom: 50, 
                left: 50 
            },
            animated: true,
          });
    }, [origin, destination])

    return (
            <MapView
                ref={mapRef}
                style={tw`flex-1 `}
                mapType='mutedStandard'
                initialRegion={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}>

                {origin && destination && ( 
                    <MapViewDirections
                        origin={origin.description}
                        destination={destination.description}
                        apikey={apiUrl}
                        strokeWidth={3}
                        strokeColor='grey'

                    />
                )}
                
                {origin?.location && (
                    <Marker 
                        coordinate={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng,
                        }}
                        title='Origin'
                        description={origin.description}
                        identifier='origin'
                    />
                )}

                {destination?.location && (
                    <Marker 
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        title='Destination'
                        description={destination.description}
                        identifier='destination'
                    />
                )}
            </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})