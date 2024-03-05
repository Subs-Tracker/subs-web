<template>
  <div v-if="services" class="wrap-services">
    <p class="title">My subscriptions</p>
    <ul v-for="(item, index) in services" :key="index" class="wrap-services">
      <li class="service">
        <div class="wrap-service">
          <img class="service-icon" :src="getIcon(item.service_id)" alt="" />
          <p class="service-name">{{ item.service_name }}</p>
        </div>
        <div class="wrap-content">
          <!-- <p class="service-due">{{ item.service_due }}</p> -->
          <p class="sevice-cost">R${{ item.service_cost.toFixed(2) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  services: Array,
  item: Object,
});

let icons = ref({});

const iconImports = import.meta.glob("~/assets/icons/*.png");

onMounted(async () => {
  for (const path in iconImports) {
    const iconName = path.split("/").pop().replace(".png", "");
    icons.value[iconName] = await iconImports[path]();
  }
});

const getIcon = (service_id) => icons.value[service_id]?.default;
</script>

<style lang="scss" scoped>
.wrap-services {
  .title {
    font-size: 1rem;
    font-weight: 400;
    color: var(--secondary-text);
    margin-bottom: 1rem;
  }
  .service {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem;

    margin: 1rem 0;
    border-radius: 8px;
    background-color: var(--surface);

    .wrap-service {
      display: flex;
      align-items: center;
      gap: 1rem;

      .service-icon {
        width: 40px;
        height: 40px;
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
        color: var(--base-text);
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
        color: var(--secondary-text);
        border: 1px solid var(--border);
        padding: 0.2rem 0.8rem;
        border-radius: 56px;
        background-color: var(--surface);
      }
      .sevice-cost {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--base-text);
      }
    }
  }
}
</style>
