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
  ActivityIndicator, // 添加 ActivityIndicator
  Alert // 添加 Alert
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
                  placeholderTextColor="#999" // 添加占位符颜色
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isloading} // 加载时禁用编辑
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)} 
                  style={styles.eyeIcon}
                  disabled={isloading} // 加载时禁用按钮
                >
                  <Feather 
                    name={showPassword ? "eye" : "eye-off"} 
                    size={20} 
                    color={isloading ? "#ccc" : "#666"} // 加载时改变颜色
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              disabled={isloading} // 加载时禁用
            >
              <Text style={[styles.forgotPasswordText, isloading && { color: "#ccc" }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* 登录按钮 - 添加加载指示器 */}
            <TouchableOpacity 
              style={[
                styles.primaryButton, 
                isloading && styles.disabledButton // 加载时添加禁用样式
              ]} 
              onPress={handleLogin}
              disabled={isloading} // 加载时禁用
            >
              {isloading ? (
                <ActivityIndicator color="#fff" size="small" /> // 显示加载指示器
              ) : (
                <Text style={styles.primaryButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            {/* 社交登录按钮 */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity 
                style={[styles.socialButton, isloading && { opacity: 0.5 }]}
                disabled={isloading} // 加载时禁用
              >
                <Feather name="facebook" size={20} color="#4267B2" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.socialButton, isloading && { opacity: 0.5 }]}
                disabled={isloading} // 加载时禁用
              >
                <Feather name="github" size={20} color="#333" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>

            {/* 注册链接 */}
            <View style={styles.switchFormContainer}>
              <Text style={styles.switchFormText}>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={() => router.replace("/(auth)/signup")}
                disabled={isloading} // 加载时禁用
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