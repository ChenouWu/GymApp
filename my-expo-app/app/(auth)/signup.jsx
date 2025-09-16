import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuthStore } from "../../store/authStore"
import { useState } from "react"
import styles from "../../styles/styles"

export default function Signup() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register } = useAuthStore()
  const router = useRouter()

  const handleSignup = async () => {
    if (password !== confirmPassword) return alert("Passwords do not match!")
    const result = await register(fullName, email, password)
    if (result.success) router.push("/(auth)/")
    else alert(result.error ?? "Signup failed")
  }

  return (
    <SafeAreaView style={styles.signupScreen} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.signupScreen}
      >
        <ScrollView contentContainerStyle={styles.signupScrollContent} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <View style={styles.signupLogoWrap}>
            <Text style={styles.signupAppName}>GYM WORLD</Text>
          </View>

          {/* Title */}
          <View style={styles.signupHeader}>
            <Text style={styles.signupTitle}>Create Account</Text>
            <Text style={styles.signupSubtitle}>Sign up to get started</Text>
          </View>

          {/* Full Name */}
          <View style={styles.signupBlock}>
            <Text style={styles.signupLabel}>Full Name</Text>
            <View style={styles.signupInputRow}>
              <Feather name="user" size={20} color="#666" />
              <TextInput style={styles.signupInput} placeholder="Enter your full name" placeholderTextColor="#999" value={fullName} onChangeText={setFullName} />
            </View>
          </View>

          {/* Email */}
          <View style={styles.signupBlock}>
            <Text style={styles.signupLabel}>Email</Text>
            <View style={styles.signupInputRow}>
              <Feather name="mail" size={20} color="#666" />
              <TextInput style={styles.signupInput} placeholder="Enter your email" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            </View>
          </View>

          {/* Password */}
          <View style={styles.signupBlock}>
            <Text style={styles.signupLabel}>Password</Text>
            <View style={styles.signupInputRow}>
              <Feather name="lock" size={20} color="#666" />
              <TextInput style={styles.signupInput} placeholder="Create a password" placeholderTextColor="#999" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.signupIconBtn}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.signupBlock}>
            <Text style={styles.signupLabel}>Confirm Password</Text>
            <View style={styles.signupInputRow}>
              <Feather name="lock" size={20} color="#666" />
              <TextInput style={styles.signupInput} placeholder="Confirm your password" placeholderTextColor="#999" secureTextEntry={!showConfirmPassword} value={confirmPassword} onChangeText={setConfirmPassword} />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.signupIconBtn}>
                <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signupPrimaryBtn} onPress={handleSignup}>
            <Text style={styles.signupPrimaryBtnText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.signupDividerRow}>
            <View style={styles.signupDivider} />
            <Text style={styles.signupDividerText}>OR</Text>
            <View style={styles.signupDivider} />
          </View>

          {/* Social Buttons */}
          <View style={styles.signupSocialRow}>
            <TouchableOpacity style={styles.signupSocialBtn}>
              <Feather name="facebook" size={20} color="#1877F2" />
              <Text style={styles.signupSocialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupSocialBtn}>
              <Feather name="github" size={20} color="#000" />
              <Text style={styles.signupSocialText}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* Switch to Login */}
          <View style={styles.signupSwitchRow}>
            <Text style={styles.signupSwitchText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/")}>
              <Text style={styles.signupSwitchLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
