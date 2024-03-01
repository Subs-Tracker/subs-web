<template>
  <div>
    <h2>Subscription Tracker</h2>
    <button @click="signInWithGoogle">Sign In with Google</button>
    <div v-if="user">
      <h3>Welcome, {{ user.email }}!</h3>
    </div>
    <div v-if="data">
      <h3>Data from Supabase:</h3>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqubwogkrzoavqytbzue.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("VITE_SUPABASE_KEY is not defined");
}
const supabase = createClient(supabaseUrl, supabaseKey);

const data = ref(null);

onMounted(async () => {
  const { data: result, error } = await supabase.from("names").select("*");

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    data.value = result;
  }
});

// Sign in with Google
let user = ref(null);
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Error signing in:", error);
  } else {
    // Wait for the OAuth flow to complete and get the authenticated user
    const user = supabase.auth.user();
    console.log(user);
  }
};
</script>
