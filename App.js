import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
          <Stack.Navigator>
              <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="MapScreen" 
                component={MapScreen} 
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
        </KeyboardAvoidingView>
          
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
