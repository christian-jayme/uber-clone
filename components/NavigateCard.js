import { StyleSheet, Text, View, SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDestination } from '../slices/navSlice';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';
const apiUrl = process.env.EXPO_PUBLIC_API_KEY;

const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Christian!</Text>
            <View >
                <GooglePlacesAutocomplete 
                placeholder='Where to?'
                fetchDetails={true}
                styles={toInputBoxStyles}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }));
                    navigation.navigate("RideOptionsCard");
                }}
                returnKeyType={"search"}
                minLength={2}
                enablePoweredByContainer={false}
                query={{
                    key: apiUrl,
                    language: 'en',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                />
                <NavFavourites/>
                <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>

                    <TouchableOpacity 
                        onPress={() =>navigation.navigate("RideOptionsCard")}
                        style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}>
                        <Icon 
                            name='car' 
                            type='font-awesome' 
                            color='white' 
                            size={16}
                            />
                        <Text style={tw`text-white text-center`}>Rides</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={tw`flex flex-row w-24 px-4 py-3 justify-between`}>
                        <Icon 
                            name='fast-food-outline' 
                            type='ionicon' 
                            color='black' 
                            size={16}/>
                        <Text style={tw`text-center`}>Eats</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})