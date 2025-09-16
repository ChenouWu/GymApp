// app/(pages)/CreateWorkout.js  或你当前同路径
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { useWorksoutStore } from "../../store/worksoutStore"
import { SafeAreaView } from "react-native-safe-area-context"

export default function CreateWorkout() {
  const { id, isEdit } = useLocalSearchParams()
  const workoutId = id
  const isEditMode = String(isEdit) === "true"

  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [duration, setDuration] = useState("")
  const [images, setImages] = useState([])
  const [imageBase64s, setImageBase64s] = useState([])
  const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "", weight: "" }])
  const [loading, setLoading] = useState(false)

  const { postWorkout, updateworkout, getSpecificWorkout } = useWorksoutStore()
  const router = useRouter()

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission required", "We need media library permission to proceed.")
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled && result.assets?.length) {
      const asset = result.assets[0]
      setImages((prev) => [...prev, asset.uri])
      setImageBase64s((prev) => [...prev, `data:image/jpeg;base64,${asset.base64}`])
    }
  }

  const handleReplaceImage = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission required", "We need media library permission to proceed.")
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled && result.assets?.length) {
      const asset = result.assets[0]
      const nextImages = [...images]
      const nextBase64s = [...imageBase64s]
      nextImages[index] = asset.uri
      nextBase64s[index] = `data:image/jpeg;base64,${asset.base64}`
      setImages(nextImages)
      setImageBase64s(nextBase64s)
    }
  }

  const handleSubmit = async () => {
    if (!title || !duration || exercises.some((ex) => !ex.name || !ex.sets || !ex.reps)) {
      Alert.alert("Missing fields", "Please fill workout name, duration, and exercise details.")
      return
    }

    setLoading(true)
    try {
      const payload = {
        title,
        duration: Number(duration),
        notes,
        exercises: exercises.map((ex) => ({
          name: ex.name,
          sets: Number(ex.sets),
          reps: Number(ex.reps),
          weight: ex.weight ? Number(ex.weight) : 0,
        })),
        images: isEditMode ? (imageBase64s.length > 0 ? imageBase64s : images) : imageBase64s,
      }

      if (isEditMode) {
        const ok = await updateworkout(workoutId, payload)
        if (ok) {
          Alert.alert("Success", "Workout plan updated successfully!", [
            { text: "OK", onPress: () => router.replace("(tabs)/") },
          ])
        } else {
          Alert.alert("Error", "Failed to update workout plan.")
        }
      } else {
        const created = await postWorkout(payload)
        if (created) {
          Alert.alert("Success", "Workout plan created successfully!", [
            { text: "OK", onPress: () => router.replace("(tabs)/") },
          ])
          setTitle("")
          setNotes("")
          setDuration("")
          setImages([])
          setImageBase64s([])
          setExercises([{ name: "", sets: "", reps: "", weight: "" }])
        }
      }
    } catch (e) {
      console.error("Error submitting workout:", e)
      Alert.alert("Error", "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const addExercise = () => setExercises((prev) => [...prev, { name: "", sets: "", reps: "", weight: "" }])
  const removeExercise = (index) => setExercises((prev) => prev.filter((_, i) => i !== index))
  const updateExercise = (index, field, value) =>
    setExercises((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })

  useEffect(() => {
    const loadWorkout = async () => {
      if (isEditMode && workoutId) {
        try {
          const data = await getSpecificWorkout(workoutId)
          if (data) {
            setTitle(data.title || "")
            setNotes(data.notes || "")
            setDuration(String(data.duration || ""))
            setExercises(data.exercises || [{ name: "", sets: "", reps: "", weight: "" }])
            setImages(data.images || [])
            setImageBase64s([])
          }
        } catch (err) {
          console.error("Failed to load workout for editing:", err)
        }
      }
    }
    loadWorkout()
  }, [isEditMode, workoutId])

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["top", "bottom", "left", "right"]}
    >
    <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#fff" }}
        keyboardVerticalOffset={100}
    >
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerTitle}>
            {isEditMode ? "Edit Workout Plan" : "Create Workout Plan"}
          </Text>
          <Text style={s.headerSubtitle}>Track your fitness journey</Text>
        </View>

        {/* Title */}
        <View style={s.block}>
          <Text style={s.label}>Title</Text>
          <View style={s.inputRow}>
            <MaterialCommunityIcons name="dumbbell" size={20} color="#666" />
            <TextInput
              style={s.input}
              placeholder="E.g., Leg Day, Upper Body, etc."
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#9a9a9a"
            />
          </View>
        </View>

        {/* Duration */}
        <View style={s.block}>
          <Text style={s.label}>Duration (minutes)</Text>
          <View style={s.inputRow}>
            <Feather name="clock" size={20} color="#666" />
            <TextInput
              style={s.input}
              placeholder="How long was your workout?"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
              placeholderTextColor="#9a9a9a"
            />
          </View>
        </View>

        {/* Exercises */}
        <View style={s.blockLg}>
          <Text style={s.label}>Exercises</Text>

          {exercises.map((exercise, index) => (
            <View key={index} style={s.exerciseCard}>
              <View style={s.exerciseHeader}>
                <Text style={s.exerciseTitle}>Exercise {index + 1}</Text>
                {exercises.length > 1 && (
                  <TouchableOpacity onPress={() => removeExercise(index)} style={s.trashBtn}>
                    <Feather name="trash-2" size={16} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Name */}
              <View style={s.field}>
                <Text style={s.fieldLabel}>Exercise Name</Text>
                <View style={s.inputRow}>
                  <MaterialCommunityIcons name="arm-flex" size={20} color="#666" />
                  <TextInput
                    style={s.input}
                    placeholder="E.g., Squats, Bench Press, etc."
                    value={exercise.name}
                    onChangeText={(v) => updateExercise(index, "name", v)}
                    placeholderTextColor="#9a9a9a"
                  />
                </View>
              </View>

              {/* Sets/Reps/Weight */}
              <View style={s.row}>
                <View style={[s.col, { marginRight: 6 }]}>
                  <Text style={s.fieldLabel}>Sets</Text>
                  <TextInput
                    style={s.inputBox}
                    placeholder="Sets"
                    value={exercise.sets}
                    onChangeText={(v) => updateExercise(index, "sets", v)}
                    keyboardType="numeric"
                    placeholderTextColor="#9a9a9a"
                  />
                </View>
                <View style={[s.col, { marginHorizontal: 6 }]}>
                  <Text style={s.fieldLabel}>Reps</Text>
                  <TextInput
                    style={s.inputBox}
                    placeholder="Reps"
                    value={exercise.reps}
                    onChangeText={(v) => updateExercise(index, "reps", v)}
                    keyboardType="numeric"
                    placeholderTextColor="#9a9a9a"
                  />
                </View>
                <View style={[s.col, { marginLeft: 6 }]}>
                  <Text style={s.fieldLabel}>Weight (kg)</Text>
                  <TextInput
                    style={s.inputBox}
                    placeholder="Weight"
                    value={exercise.weight}
                    onChangeText={(v) => updateExercise(index, "weight", v)}
                    keyboardType="numeric"
                    placeholderTextColor="#9a9a9a"
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={s.addBtn} onPress={addExercise}>
            <Feather name="plus" size={20} color="#fff" />
            <Text style={s.addBtnText}>Add New Exercise</Text>
          </TouchableOpacity>
        </View>

        {/* Notes */}
        <View style={s.blockLg}>
          <Text style={s.label}>Say Something !</Text>
          <View style={s.textareaRow}>
            <Feather name="file-text" size={20} color="#666" style={{ marginTop: 14 }} />
            <TextInput
              style={s.textarea}
              placeholder="How did you feel? Any achievements?"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
              placeholderTextColor="#9a9a9a"
            />
          </View>
        </View>

        {/* Images */}
        <View style={s.blockLg}>
          <Text style={s.label}>Upload Images</Text>
          <View style={s.imageRow}>
            {images.map((uri, index) => (
              <View key={index} style={s.imageWrap}>
                <Image source={{ uri }} style={s.image} />
                <TouchableOpacity onPress={() => handleReplaceImage(index)} style={s.editFab}>
                  <Feather name="edit-2" size={14} color="#333" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity onPress={pickImage} style={s.imagePicker}>
              <Feather name="plus" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[s.submitBtn, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.submitText}>
              {isEditMode ? "Save Changes" : "Save Workout Plan"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
      </SafeAreaView>
  )
}
// Style sheet
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 20 },

  header: { marginTop: 24, marginBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#111" },
  headerSubtitle: { fontSize: 13, color: "#6b6b6b", marginTop: 4 },

  block: { marginTop: 16 },
  blockLg: { marginTop: 24 },

  label: { fontSize: 15, fontWeight: "600", color: "#2b2b2b", marginBottom: 8 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    paddingVertical: 12,
    marginLeft: 8,
  },

  field: { marginBottom: 12 },
  fieldLabel: { fontSize: 13, color: "#666", marginBottom: 6 },

  row: { flexDirection: "row" },
  col: { flex: 1 },

  inputBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111",
    backgroundColor: "#fff",
  },

  exerciseCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  exerciseTitle: { color: "#111", fontWeight: "700" },
  trashBtn: {
    backgroundColor: "#111",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  textareaRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    minHeight: 112,
  },
  textarea: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    paddingVertical: 12,
    marginLeft: 8,
    minHeight: 112,
  },

  addBtn: {
    marginTop: 6,
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: { color: "#fff", fontWeight: "600", marginLeft: 8 },

  imageRow: { flexDirection: "row", flexWrap: "wrap" },
  imageWrap: { marginRight: 8, marginBottom: 8, position: "relative" },
  image: { width: 96, height: 96, borderRadius: 10, backgroundColor: "#f0f0f0" },
  editFab: {
    position: "absolute",
    right: 4,
    bottom: 4,
    backgroundColor: "#fff",
    borderRadius: 999,
    padding: 6,
  },
  imagePicker: {
    width: 96,
    height: 96,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },

  submitBtn: {
    marginTop: 24,
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
})
