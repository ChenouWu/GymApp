import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://gym-socialapp.onrender.com/api";


const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const fetchJSON = async (url, options = {}) => {
  const res = await fetch(url, options);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }
  return data;
};

export const useWorksoutStore = create((set, get) => ({
  workouts: [],
  workout: null,

  // for home page
  getEightWorkouts: async () => {
    try {
      const headers = await getAuthHeaders();
      const data = await fetchJSON(`${BASE_URL}/workout/geteight`, {
        method: "GET",
        headers,
      });
      set({ workouts: data });
      return data;
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  },

  // for single workout
  getSpecificWorkout: async (id) => {
    try {
      const headers = await getAuthHeaders();
      const data = await fetchJSON(`${BASE_URL}/workout/${id}`, {
        method: "GET",
        headers,
      });
      set({ workout: data });
      return data;
    } catch (error) {
      console.error("Error fetching specific workout:", error);
    }
  },

  // post a workout
  postWorkout: async (workout) => {
    try {
      const headers = await getAuthHeaders();
      const data = await fetchJSON(`${BASE_URL}/workout/post`, {
        method: "POST",
        headers,
        body: JSON.stringify(workout),
      });
      // 可选：把新建的 workout 追加到列表
      set((state) => ({ workouts: [data, ...(state.workouts || [])], workout: data }));
      return data;
    } catch (error) {
      console.error("❌ Error posting workout:", error.message);
    }
  },

  // delete a workout
  deleteSpecificWorkout: async (id) => {
    try {
      const headers = await getAuthHeaders();
      await fetchJSON(`${BASE_URL}/workout/delete/${id}`, {
        method: "DELETE",
        headers,
      });
      set((state) => ({
        workouts: (state.workouts || []).filter((w) => w._id !== id),
        // 如果当前详情就是被删的，也清掉
        workout: state.workout && state.workout._id === id ? null : state.workout,
      }));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  },

  // update a workout
  updateworkout: async (id, updatedWorkout) => {
    try {
      const headers = await getAuthHeaders();
      const data = await fetchJSON(`${BASE_URL}/workout/update/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedWorkout),
      });

      // 更新详情与列表
      set((state) => ({
        workout: data,
        workouts: (state.workouts || []).map((w) => (w._id === id ? data : w)),
      }));
      return data;
    } catch (error) {
      console.error("❌ Error updating workout:", error.message);
    }
  },
}));
