import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BASE_URL = 'https://gymapp-ej8y.onrender.com/api'


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
      const data = await fetchJSON(`https://gymapp-ej8y.onrender.com/api/workout/geteight`, {
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
      const data = await fetchJSON(`https://gymapp-ej8y.onrender.com/api/workout/${id}`, {
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
      const data = await fetchJSON(`https://gymapp-ej8y.onrender.com/api/workout/post`, {
        method: "POST",
        headers,
        body: JSON.stringify(workout),
      });
      
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
      await fetchJSON(`https://gymapp-ej8y.onrender.com/api/workout/delete/${id}`, {
        method: "DELETE",
        headers,
      });
      set((state) => ({
        workouts: (state.workouts || []).filter((w) => w._id !== id),
      
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
      const data = await fetchJSON(`https://gymapp-ej8y.onrender.com/api/workout/update/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedWorkout),
      });

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
