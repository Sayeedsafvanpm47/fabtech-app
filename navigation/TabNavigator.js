import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ServicesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServicesList" component={ServicesScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 2,
          borderTopColor: '#DC2626',
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          shadowColor: '#DC2626',
          shadowOffset: {
            width: 0,
            height: -6,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 15,
        },
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Text style={{ 
              fontSize: size, 
              color: focused ? '#DC2626' : '#9CA3AF',
              textShadowColor: '#DC2626',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: focused ? 2 : 0,
            }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Text style={{ 
              fontSize: size, 
              color: focused ? '#DC2626' : '#9CA3AF',
              textShadowColor: '#DC2626',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: focused ? 2 : 0,
            }}>⚙️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Text style={{ 
              fontSize: size, 
              color: focused ? '#DC2626' : '#9CA3AF',
              textShadowColor: '#DC2626',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: focused ? 2 : 0,
            }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Text style={{ 
              fontSize: size, 
              color: focused ? '#DC2626' : '#9CA3AF',
              textShadowColor: '#DC2626',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: focused ? 2 : 0,
            }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
