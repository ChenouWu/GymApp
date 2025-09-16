// app/(tabs)/Profile.js
import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { useAuthStore } from "../../store/authStore"
import { useRouter } from "expo-router"
import { useWorksoutStore } from "../../store/worksoutStore"
import styles from "../../styles/styles"

export default function Profile() {
  const [exercises, setExercises] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [refreshing, setRefreshing] = useState(false)

  const router = useRouter()
  const { user, getMyexercises, LogOut, getUserProfile } = useAuthStore()
  const { deleteSpecificWorkout } = useWorksoutStore()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await getMyexercises()
    if (data) setExercises(data)
    if (user?._id) await getUserProfile(user._id)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }, [])

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => LogOut(), style: "destructive" },
    ])
  }

  const handleDelete = async (id) => {
    try {
      await deleteSpecificWorkout(id)
      setExercises((prev) => prev.filter((ex) => ex._id !== id))
      Alert.alert("Deleted", "Workout has been deleted.")
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Failed to delete workout.")
    }
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.profileScreen}>
        <Text style={[styles.textMuted, { textAlign: "center", marginTop: 48 }]}>
          Loading user...
        </Text>
      </SafeAreaView>
    )
  }

  const totalExercises = exercises.length
  const totalDuration = exercises.reduce((sum, ex) => sum + Number(ex?.duration || 0), 0)

  const filteredExercises = exercises.filter((exercise) => {
    const title = (exercise?.title || "").toLowerCase()
    const matchesSearch = title.includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || exercise?.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderExerciseItem = ({ item }) => {
    const cover = item?.images?.[0] || "https://via.placeholder.com/300x200?text=Workout"
    return (
      <View style={styles.cardWrap}>
        <TouchableOpacity
          style={styles.cardTouchable}
          onPress={() => router.push(`/(pages)/workoutDetail?id=${item._id}`)}
          activeOpacity={0.9}
        >
          <ImageBackground source={{ uri: cover }} style={styles.cardImageBg} imageStyle={styles.cardImage}>
            {/* 顶部右侧操作：编辑/删除 */}
            <View style={styles.cardTopActions}>
              <TouchableOpacity
                onPress={() => router.push(`/(tabs)/create?id=${item._id}&isEdit=true`)}
                style={[styles.iconPill, { marginRight: 8 }]}
              >
                <Feather name="edit-2" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure to delete this workout?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", onPress: () => handleDelete(item._id), style: "destructive" },
                  ])
                }
                style={styles.iconPill}
              >
                <Feather name="trash-2" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* 标题与分类 */}
            <View style={styles.cardTitleBox}>
              <View style={styles.rowBetween}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item?.title || "Untitled Workout"}
                </Text>
                <View style={styles.badgeGhost}>
                  <Text style={styles.badgeGhostText}>Workout</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* 下方信息区块 */}
        <View style={styles.cardMeta}>
          <Text style={styles.cardNotes} numberOfLines={2}>
            {item?.notes || "No notes provided."}
          </Text>

          <View style={[styles.row, { marginTop: 8 }]}>
            <View style={[styles.row, { marginRight: 16 }]}>
              <Feather name="clock" size={14} color="#666" />
              <Text style={[styles.textMuted, { marginLeft: 4 }]}>{item?.duration} min</Text>
            </View>
            <View style={styles.row}>
              <Feather name="calendar" size={14} color="#666" />
              <Text style={[styles.textMuted, { marginLeft: 4 }]}>
                {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "--/--/----"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const categories = ["All", "Strength", "Cardio", "Mobility"]

  return (
    <SafeAreaView style={styles.profileScreen}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 96 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logout button */}
        <View style={[styles.section]}>
          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <TouchableOpacity style={styles.row} onPress={handleLogout} activeOpacity={0.8}>
              <Feather name="log-out" size={18} color="#ff3b30" />
              <Text style={[styles.textDanger, { marginLeft: 6, fontWeight: "600" }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Infor */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Image
              source={{ uri: user?.profileImage || "https://via.placeholder.com/80" }}
              style={styles.avatar}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.userName} numberOfLines={1}>
                {user?.username || "User"}
              </Text>
              {!!user?.location && (
                <View style={[styles.row, { marginTop: 4 }]}>
                  <Feather name="map-pin" size={14} color="#666" />
                  <Text style={[styles.textMuted, { marginLeft: 4 }]}>{user.location}</Text>
                </View>
              )}
              <Text style={[styles.textSubtle, { marginTop: 4 }]} numberOfLines={1}>
                {user?.email || ""}
              </Text>
            </View>
            <TouchableOpacity style={styles.btnOutlineSm} onPress={() => router.push("/(pages)/editProfile")}>
              <Feather name="edit-2" size={16} color="#111" />
            </TouchableOpacity>
          </View>

          {/* Static */}
          <View style={[styles.row, { marginTop: 16 }]}>
            <View style={[styles.statCard, { marginRight: 8 }]}>
              <Text style={styles.statNumber}>{totalExercises}</Text>
              <Text style={styles.textSubtle}>Workouts</Text>
            </View>
            <View style={[styles.statCard, { marginLeft: 8 }]}>
              <Text style={styles.statNumber}>{totalDuration}</Text>
              <Text style={styles.textSubtle}>Minutes</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.inputRow}>
            <Feather name="search" size={18} color="#666" />
            <TextInput
              style={[styles.input, { marginLeft: 8 }]}
              placeholder="Search workouts..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9a9a9a"
            />
            {searchQuery?.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Feather name="x" size={18} color="#666" />
              </TouchableOpacity>
            )}
          </View>

      
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12 }}
            contentContainerStyle={{ paddingRight: 12 }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[styles.chip, active ? styles.chipActive : styles.chipDefault]}
                >
                  <Text style={[styles.chipText, active ? styles.chipTextActive : styles.chipTextDefault]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* 标题 + 添加按钮 */}
        <View style={[styles.section, styles.rowBetween]}>
          <Text style={styles.sectionTitle}>My Exercises</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/create")} style={styles.btnPrimarySm}>
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* 列表 */}
        <View style={[styles.section, { paddingTop: 0 }]}>
          {filteredExercises.length > 0 ? (
            filteredExercises.map((item) => <View key={item._id}>{renderExerciseItem({ item })}</View>)
          ) : (
            <View style={styles.emptyBox}>
              <Feather name="activity" size={48} color="#ccc" />
              <Text style={[styles.textMuted, { marginTop: 12 }]}>No exercises found</Text>
              <Text style={styles.textSubtle}>Try a different search or category</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(tabs)/create")}
        activeOpacity={0.9}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
