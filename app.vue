<template>
  <div class="page">
    <header>
      <h1>Subs Tracker</h1>
      <button @click="toggleDarkMode">
        {{ isDarkMode ? "Dark Mode" : "Light Mode" }}
      </button>
    </header>
    <div class="wrap-total">
      <p class="label">Total</p>
      <p class="total">{{ "R$" + totalCost.toFixed(2) }}</p>
    </div>
    <SubsList :services="data" />
  </div>
</template>

<script setup lang="ts">
const isDarkMode = ref(true);
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }
};

onMounted(() => {
  if (isDarkMode.value) {
    document.body.classList.add("dark-mode");
  }
});

const { data } = useSupabase("services");
const totalCost = computed(() => {
  return data.value.reduce((total, item) => total + item.service_cost, 0);
});
</script>

<style lang="scss">
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
  }

  button {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    font-weight: 400;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
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
</style>
