<template>
  <div class="page">
    <h1>Subscription Tracker</h1>
    <div class="wrap-total">
      <p class="label">Total</p>
      <p class="total">R${{ totalCost.toFixed(2) }}</p>
    </div>
    <div v-if="data" class="wrap-services">
      <p class="my-services">My subscriptions</p>
      <ul v-for="(item, index) in data" :key="index" class="wrap-services">
        <li class="service">
          <div class="wrap-title">
            <div class="service-icon" :class="item.service_id"></div>
            <p class="service-name">{{ item.service_name }}</p>
          </div>
          <div class="wrap-content">
            <p class="service-due">{{ item.service_due }}</p>
            <p class="sevice-cost">R${{ item.service_cost.toFixed(2) }}</p>
          </div>
        </li>
      </ul>
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

interface DataType {
  service_name: string;
  service_due: string;
  service_cost: number;
  // other properties...
}

const data = ref<DataType[]>([]);

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

const totalCost = computed(() => {
  return data.value.reduce((total, item) => total + item.service_cost, 0);
});
</script>

<style lang="scss">
// globals
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  border: 0;
  padding: 0;
}

body {
  font-family: "Work Sans", sans-serif;
  font-size: 62.5%;
  line-height: 1.5;
  color: #333;
  background-color: #f2f2f2;
}

//end-globals

.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.wrap-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  .label {
    font-size: 1.2rem;
    font-weight: 400;
  }
  .total {
    font-size: 2rem;
    font-weight: 800;
  }
}

.wrap-services {
  .my-services {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  .service {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem;
    border: 1px solid #ddd;
    margin: 1rem 0;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .wrap-title {
      display: flex;
      align-items: center;
      gap: 1rem;

      .service-icon {
        width: 40px;
        height: 40px;
        background-color: #eee;
        border-radius: 0.4rem;
      }
      .netflix {
        background-color: #e50914;
      }
      .spotify {
        background-color: #1db954;
      }
      .github-copilot {
        background-color: #24292e;
      }
      .service-name {
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
    .wrap-content {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      font-size: 1.2rem;
      font-weight: 400;

      .service-due {
        font-size: 0.8rem;
        color: #666;
        border: 1px solid #bbb;
        padding: 0.2rem 0.8rem;
        border-radius: 56px;
        background-color: #eee;
      }
      .sevice-cost {
        font-size: 1.2rem;
        font-weight: 800;
      }
    }
  }
}
</style>
