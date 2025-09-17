import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator, 
  Alert 
} from "react-native"
import { useState } from "react"
import styles from "../../styles/styles"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isloading, setIsloading] = useState(false);

  const router = useRouter();
  const { LogIn } = useAuthStore();

  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    
    setIsloading(true);
    
    try {
      const result = await LogIn(email, password);
      
      if (result && result.success) {
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/(tabs)/");
      } else {
        
        const errorMessage = result?.message || "Login failed. Please try again.";
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsloading(false);
    }
  }

  return (
   <SafeAreaView style={styles.loginScreen}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.loginScreen}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>GYM WORLD</Text>
          </View>

          <View style={styles.formContainer}>
         
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999" 
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  editable={!isloading} 
                />
              </View>
            </View>

           
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#999" 
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isloading} 
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)} 
                  style={styles.eyeIcon}
                  disabled={isloading} 
                >
                  <Feather 
                    name={showPassword ? "eye" : "eye-off"} 
                    size={20} 
                    color={isloading ? "#ccc" : "#666"} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              disabled={isloading} 
            >
              <Text style={[styles.forgotPasswordText, isloading && { color: "#ccc" }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            
            <TouchableOpacity 
              style={[
                styles.primaryButton, 
                isloading && styles.disabledButton 
              ]} 
              onPress={handleLogin}
              disabled={isloading} 
            >
              {isloading ? (
                <ActivityIndicator color="#fff" size="small" /> 
              ) : (
                <Text style={styles.primaryButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

      
            <View style={styles.switchFormContainer}>
              <Text style={styles.switchFormText}>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={() => router.replace("/(auth)/signup")}
                disabled={isloading} 
              >
                <Text style={[styles.switchFormLink, isloading && { color: "#ccc" }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}