import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"


export default function EditProfile() {
  const [username, setUsername] = useState("")
  const [profileImage, setProfileImage] = useState(null)  
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        if (!token) {
          Alert.alert("Not logged in", "Please login first.")
          router.replace("/(auth)")
          return
        }
        const res = await fetch(`https://gymapp-ej8y.onrender.com/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (res.ok && data?.user) {
          setUsername(data.user.username || "")
          setProfileImage(data.user.profileImage || null) // 可能是 URL
        }
      } catch (e) {
        console.error("loadProfile error:", e)
      } finally {
        setInitializing(false)
      }
    }
    loadProfile()
  }, [])

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission", "We need permission to access your photos.")
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    })
    if (!result.canceled && result.assets?.length > 0) {
      const b64 = `data:image/jpeg;base64,${result.assets[0].base64}`
      setProfileImage(b64)
    }
  }

  const clearImage = () => setProfileImage(null)

  const handleUpdateProfile = async () => {
    if (!username.trim()) {
      Alert.alert("Validation", "Username is required.")
      return
    }
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("token")
      const res = await fetch(`https://gymapp-ej8y.onrender.com/api/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: username.trim(), profileImage }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Update failed")
      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => router.push("/(tabs)/profile") },
      ])
    } catch (e) {
      console.error("Update error:", e)
      Alert.alert("Error", e.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  if (initializing) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
        <Text className="mt-2 text-gray-500">Loading profile…</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-4 pb-2 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Feather name="chevron-left" size={22} color="#111" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">Edit Profile</Text>
        <View className="w-7" />
      </View>

      <View className="flex-1 px-5">
        {/* Avatar */}
        <View className="items-center mt-6">
          {profileImage ? (
            <Image source={{ uri: profileImage }} className="w-28 h-28 rounded-full bg-gray-200" />
          ) : (
            <View className="w-28 h-28 rounded-full bg-gray-200 items-center justify-center">
              <Feather name="user" size={36} color="#888" />
            </View>
          )}
          <View className="flex-row mt-3">
            <TouchableOpacity onPress={pickImage} className="bg-black rounded-xl px-4 py-2 mr-2">
              <Text className="text-white font-medium">Change</Text>
            </TouchableOpacity>
            {!!profileImage && (
              <TouchableOpacity onPress={clearImage} className="border border-gray-300 rounded-xl px-4 py-2">
                <Text className="text-gray-800 font-medium">Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Username */}
        <View className="mt-8">
          <Text className="text-gray-700 mb-2 font-medium">Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
            autoCapitalize="none"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          />
        </View>

        {/* Save button */}
        <TouchableOpacity
          disabled={loading}
          onPress={handleUpdateProfile}
          className={`mt-8 bg-black rounded-xl py-4 ${loading ? "opacity-70" : ""}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center text-lg font-semibold">Update Profile</Text>
          )}
        </TouchableOpacity>

        {/* Tips */}
        <Text className="text-gray-400 text-xs mt-3">
          Tip: Large base64 images increase payload size. Consider uploading to cloud storage and saving the URL.
        </Text>
      </View>
    </SafeAreaView>
  )
}
