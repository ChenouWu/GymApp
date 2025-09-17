import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { useAuthStore } from "../../store/authStore"
import styles from "../../styles/styles"
import { SafeAreaView } from "react-native-safe-area-context"

const mockComments = [
  {
    _id: "1",
    text: "Great workout! I tried it yesterday and felt amazing.",
    user: {
      _id: "101",
      username: "fitness_lover",
      profileImage: "https://api.dicebear.com/9.x/big-ears/svg?seed=fitness_lover",
    },
    createdAt: "2023-05-10T14:30:00.000Z",
  },
  {
    _id: "2",
    text: "I modified the second exercise to use dumbbells instead of a barbell and it worked well!",
    user: {
      _id: "102",
      username: "gym_rat22",
      profileImage: "https://api.dicebear.com/9.x/big-ears/svg?seed=gym_rat22",
    },
    createdAt: "2023-05-11T09:15:00.000Z",
  },
]

const { width } = Dimensions.get("window")

export default function WorkoutDetail() {
  const { id } = useLocalSearchParams()
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const scrollY = useRef(new Animated.Value(0)).current
  const router = useRouter()
  const { user } = useAuthStore()

  
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`https://gymapp-ej8y.onrender.com/api/workout/${id}`)
        const data = await res.json()
        setWorkout(data)
      } catch (err) {
        console.error("Failed to fetch workout:", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchWorkout()
  }, [id])

  

  const isOwner = user && workout && user._id === workout.user?._id
  const handleEdit = () => router.push(`/(tabs)/create?id=${id}&isEdit=true`)

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    setSubmitting(true)
    try {
      const newCommentObj = {
        _id: Date.now().toString(),
        text: newComment,
        user: {
          _id: user?._id ?? "me",
          username: user?.username ?? "me",
          profileImage: user?.profileImage ?? "https://api.dicebear.com/9.x/big-ears/svg?seed=me",
        },
        createdAt: new Date().toISOString(),
      }
      setComments([newCommentObj, ...comments])
      setNewComment("")
    } catch (e) {
      console.error("Error adding comment:", e)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  if (loading)
    return (
      <View style={styles.detailLoading}>
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text style={styles.detailLoadingText}>Loading workout...</Text>
      </View>
    )

  if (!workout)
    return (
      <View style={styles.detailNotFound}>
        <Feather name="alert-circle" size={60} color="#F87171" />
        <Text style={styles.detailNotFoundTitle}>Workout not found</Text>
        <TouchableOpacity style={styles.detailBackBtn} onPress={() => router.back()}>
          <Text style={styles.detailBackBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )

  const formattedDate = new Date(workout.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  let workoutImages = []
  if (Array.isArray(workout.images) && workout.images.length > 0) workoutImages = workout.images
  else if (workout.image) workoutImages = [workout.image]
  const hasImages = workoutImages.length > 0

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}
    edges={["top", "bottom", "left", "right"]}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.detailScreen}
      keyboardVerticalOffset={100}
    >
      <StatusBar barStyle="light-content" />

      {/* Animated header */}
      <Animated.View style={[styles.detailHeaderBar, { opacity: headerOpacity }]}>
        <TouchableOpacity style={styles.detailHeaderIconBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.detailHeaderTitle}>
          {workout.title}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.detailHeaderIconBtn} onPress={handleShare}>
            <Feather name="share-2" size={20} color="#fff" />
          </TouchableOpacity>
          {isOwner && (
            <TouchableOpacity style={styles.detailHeaderIconBtn} onPress={handleEdit}>
              <Feather name="edit-2" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailScrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        <View style={styles.detailBody}>
          {/* top actions */}
          <View style={styles.rowBetween}>
            <TouchableOpacity style={styles.detailRoundBtn} onPress={() => router.back()}>
              <Feather name="arrow-left" size={20} color="#60A5FA" />
            </TouchableOpacity>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.detailRoundBtn, { marginRight: 8 }]} onPress={handleShare}>
                <Feather name="share-2" size={18} color="#60A5FA" />
              </TouchableOpacity>
              {isOwner && (
                <TouchableOpacity style={styles.detailRoundBtn} onPress={handleEdit}>
                  <Feather name="edit-2" size={18} color="#60A5FA" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* profile */}
          <View style={styles.detailProfileCard}>
            <Image source={{ uri: workout.user?.profileImage }} style={styles.detailAvatar} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.detailCreatorName}>{workout.user?.username}</Text>
              <Text style={styles.detailCreatorRole}>Workout Creator</Text>
            </View>
            <TouchableOpacity style={styles.detailFollowBtn}>
              <Text style={styles.detailFollowBtnText}>Follow</Text>
            </TouchableOpacity>
          </View>

          {/* title & meta */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.detailTitle}>{workout.title}</Text>
            <View style={[styles.row, { marginTop: 8 }]}>
              <View style={[styles.row, { marginRight: 16 }]}>
                <Feather name="clock" size={16} color="#A1A1AA" />
                <Text style={styles.detailMetaText}>{workout.duration} mins</Text>
              </View>
              <View style={styles.row}>
                <Feather name="calendar" size={16} color="#A1A1AA" />
                <Text style={styles.detailMetaText}>{formattedDate}</Text>
              </View>
            </View>
          </View>

          {/* gallery */}
          {hasImages && (
            <View style={{ marginTop: 20 }}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const newIndex = Math.floor(e.nativeEvent.contentOffset.x / width)
                  setActiveImageIndex(newIndex)
                }}
              >
                {workoutImages.map((imgUrl, index) => (
                  <View key={index} style={{ width }}>
                    <Image source={{ uri: imgUrl }} style={styles.detailGalleryImage} resizeMode="cover" />
                  </View>
                ))}
              </ScrollView>

              {workoutImages.length > 1 && (
                <View style={styles.detailDotsRow}>
                  {workoutImages.map((_, index) => (
                    <View
                      key={index}
                      style={[styles.detailDot, index === activeImageIndex && styles.detailDotActive]}
                    />
                  ))}
                </View>
              )}
            </View>
          )}

          {/* stats */}
          <View style={styles.detailStatsRow}>
            <View style={styles.detailStatCard}>
              <Text style={styles.detailStatNumber}>{workout.exercises.length}</Text>
              <Text style={styles.detailStatLabel}>Exercises</Text>
            </View>
            <View style={styles.detailStatCard}>
              <Text style={styles.detailStatNumber}>
                {workout.exercises.reduce((total, ex) => total + (ex.sets || 0), 0)}
              </Text>
              <Text style={styles.detailStatLabel}>Total Sets</Text>
            </View>
            <View style={styles.detailStatCard}>
              <Text style={styles.detailStatNumber}>
                {workout.exercises.reduce((total, ex) => total + (ex.weight || 0), 0)}
              </Text>
              <Text style={styles.detailStatLabel}>Total Weight</Text>
            </View>
          </View>

          {/* notes */}
          {!!workout.notes && (
            <View style={{ marginTop: 24 }}>
              <Text style={styles.detailSectionTitle}>Notes</Text>
              <View style={styles.detailNotesCard}>
                <Text style={styles.detailNotesText}>{workout.notes}</Text>
              </View>
            </View>
          )}

          {/* exercises */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.detailSectionTitle}>Exercises</Text>
            {workout.exercises.map((ex, index) => (
              <View key={ex._id ?? index} style={styles.detailExerciseItem}>
                <View style={styles.row}>
                  <View style={styles.detailExerciseIndex}>
                    <Text style={styles.detailExerciseIndexText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.detailExerciseName}>{ex.name}</Text>
                </View>

                <View style={[styles.row, { marginTop: 12 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.detailExerciseLabel}>Sets</Text>
                    <Text style={styles.detailExerciseValue}>{ex.sets}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.detailExerciseLabel}>Reps</Text>
                    <Text style={styles.detailExerciseValue}>{ex.reps}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.detailExerciseLabel}>Weight</Text>
                    <Text style={styles.detailExerciseValue}>{ex.weight || 0} kg</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* comments */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.detailSectionTitle}>Comments ({comments.length})</Text>

            {/* form */}
            <View style={[styles.row, { marginTop: 12 }]}>
              <Image
                source={{ uri: user?.profileImage ?? "https://api.dicebear.com/9.x/big-ears/svg?seed=guest" }}
                style={styles.detailCommentAvatar}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.detailCommentInputRow}>
                  <TextInput
                    style={styles.detailCommentInput}
                    placeholder="Add a comment..."
                    placeholderTextColor="#9CA3AF"
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline
                  />
                  <TouchableOpacity
                    disabled={!newComment.trim() || submitting}
                    onPress={handleAddComment}
                    style={[styles.detailSendBtn, (!newComment.trim() || submitting) && styles.detailSendBtnDisabled]}
                  >
                    {submitting ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : (
                      <Feather name="send" size={16} color="#000" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* list */}
            {comments.length > 0 ? (
              <View style={{ marginTop: 12 }}>
                {comments.map((comment) => (
                  <View key={comment._id} style={[styles.row, { marginTop: 12 }]}>
                    <Image source={{ uri: comment.user.profileImage }} style={styles.detailCommentAvatar} />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <View style={styles.rowBetween}>
                        <Text style={styles.detailCommentUsername}>{comment.user.username}</Text>
                        <Text style={styles.detailCommentDate}>{formatDate(comment.createdAt)}</Text>
                      </View>
                      <Text style={styles.detailCommentText}>{comment.text}</Text>
                      <View style={[styles.row, { marginTop: 8 }]}>
                        <TouchableOpacity style={styles.detailCommentAction}>
                          <Feather name="heart" size={14} color="#A1A1AA" />
                          <Text style={styles.detailCommentActionText}>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.detailCommentAction, { marginLeft: 16 }]}>
                          <Feather name="message-circle" size={14} color="#A1A1AA" />
                          <Text style={styles.detailCommentActionText}>Reply</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.detailNoComments}>
                <Feather name="message-circle" size={40} color="#A1A1AA" />
                <Text style={styles.detailNoCommentsTitle}>No comments yet</Text>
                <Text style={styles.detailNoCommentsSubtitle}>Be the first to comment on this workout</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
     </SafeAreaView>
  )
}
