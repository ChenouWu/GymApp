import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'


export default function _layout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarStyle: {
          height: 62, // Reduced height
          paddingBottom: 6, // Reduced bottom padding
          paddingTop: 2, // Reduced top padding
          borderTopWidth: 1,
          borderTopColor: "#eee", 
        },
        tabBarItemStyle: {
          padding: 0, // Remove padding from items
        },
        tabBarLabelStyle: {
          fontSize: 10, // Smaller font size
          marginTop: 0, // Remove margin
        },
        tabBarIconStyle: {
          marginBottom: 0, // Remove bottom margin
        },
      }} >
        <Tabs.Screen name="index" options={{title:"Home", tabBarIcon:({color,size})=> (
            <Ionicons name='home-outline' size={size} color={color} /> 
    )}}  />
        <Tabs.Screen name="create" options={{title:"Create", tabBarIcon:({color,size})=> (
            <Ionicons name='add-circle-outline' size={size} color={color}  />
    )}} />

        <Tabs.Screen name="profile" options={{title:"Profile", tabBarIcon:({color,size})=> (
            <Ionicons name='person-outline' size={size} color={color}  />
    )}} />

    </Tabs>
  )
}