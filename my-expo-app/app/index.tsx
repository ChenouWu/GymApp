import { Link } from "expo-router"
import { Text, TouchableOpacity, View, StatusBar } from "react-native"
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react"
import { Feather } from "@expo/vector-icons"
import styles from "../styles/styles.js" // 导入样式

export default function Index() {
  const { user, token, checkAuth, LogOut } = useAuthStore()
  console.log(user + ", token:" + token)

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>GYM WORLD</Text>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>Your personal fitness companion</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>

          {user && (
            <TouchableOpacity onPress={LogOut} style={styles.logoutButton}>
              <Feather name="log-out" size={18} color="#fff" style={styles.iconLeft} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
      )
}
