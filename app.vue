<template>
  <div>
    <h2>Subscription Tracker</h2>
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
  const { data: result, error } = await supabase
    .from("subscriptions")
    .select("*");

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    data.value = result;
  }
});
</script>
