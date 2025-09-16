import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native"
import { useRouter } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { useWorksoutStore } from "../../store/worksoutStore"
import styles from "../../styles/styles"

export default function HomeTab() {
  const [loading, setLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const { getEightWorkouts } = useWorksoutStore()

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const res = await getEightWorkouts()
        if (res) setWorkouts(res)
      } finally {
        setLoading(false)
      }
    }
    loadWorkouts()
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      const res = await getEightWorkouts()
      if (res) setWorkouts(res)
    } finally {
      setRefreshing(false)
    }
  }, [])

  const renderWorkoutItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.gridCard}
        onPress={() => router.push(`/(pages)/workoutDetail?id=${item._id}`)}
      >
        <Image
          source={{ uri: item?.images?.[0] || "https://via.placeholder.com/100" }}
          style={styles.gridCardImage}
        />
        <View style={styles.gridCardContent}>
          <Text style={styles.gridCardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.gridCardDescription} numberOfLines={2}>
            {item.notes || "No notes provided."}
          </Text>
          <View style={styles.gridCardFooter}>
            <View style={styles.statItem}>
              <Feather name="clock" size={12} color="#666" />
              <Text style={styles.statText}>{item.duration} min</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>Workout</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [router]
  )

  return (
    <View style={styles.homeScreen}>
      <Text style={styles.homeTitle}>Explore</Text>

      {loading ? (
        <View style={styles.emptyContainer}>
          <Feather name="loader" size={30} color="#3498db" />
          <Text style={styles.emptyText}>Loading workouts...</Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item._id}
          renderItem={renderWorkoutItem}
          numColumns={2}
          key={"grid-view-2-columns"}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="activity" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No workouts found</Text>
              <Text style={styles.emptySubtext}>Create your first workout!</Text>
            </View>
          }
        />
      )}
    </View>
  )
}
