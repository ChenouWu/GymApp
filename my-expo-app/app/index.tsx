import { Link } from "expo-router"
import { Text, TouchableOpacity, View, StatusBar } from "react-native"
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react"
import styles from "../styles/styles.js"

export default function Index() {
  const { user, token, checkAuth } = useAuthStore()
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

          
        </View>
      </View>
    </View>
      )
}
