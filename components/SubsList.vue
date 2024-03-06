<template>
  <div v-if="services" class="wrap-services">
    <p class="title">My subscriptions</p>
    <ul v-for="(item, index) in services" :key="index">
      <li
        @click="toggleExpand(item.id)"
        class="service-card"
        :class="{ expanded: isExpanded(item.id) }"
      >
        <div class="collapsed">
          <div class="wrap-service-name">
            <img :src="getIcon(item.service_id)" alt="" />
            <p>{{ item.service_name }}</p>
          </div>
          <div class="wrap-cost">
            <p class="sevice-cost">R${{ item.service_cost.toFixed(2) }}</p>
          </div>
        </div>
        <transition name="appear">
          <div v-show="isExpanded(item.id)" class="expanded">
            <p class="label">Next charge</p>
            <p class="service-due">{{ item.service_due }}</p>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  services: Array,
  item: Object,
});

let expandedItems = ref<Record<string, boolean>>({});

const toggleExpand = (id: string) => {
  if (expandedItems.value[id]) {
    // If the clicked item is already open, close it
    expandedItems.value[id] = false;
  } else {
    // Close all items
    for (const key in expandedItems.value) {
      expandedItems.value[key] = false;
    }
    // Open the clicked item
    expandedItems.value[id] = true;
  }
};

const isExpanded = (id: string) => {
  return expandedItems.value[id];
};

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

  .service-card {
    max-height: 100px;
    transition: max-height 0.15s ease-out;
  }
  .service-card.expanded {
    max-height: 200px;
  }

  .service-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem;
    margin: 1rem 0;
    border-radius: 8px;
    background-color: var(--surface);
    cursor: pointer;

    .collapsed {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 1.6rem;
    }

    .wrap-service-name {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        width: 40px;
        height: 40px;
        border-radius: 0.4rem;
      }
      p {
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--base-text);
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
    .wrap-cost {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      font-size: 1.2rem;
      font-weight: 400;

      .sevice-cost {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--base-text);
      }
    }

    .appear-enter-active,
    .appear-leave-active {
      transition: opacity 0.15s, transform 0.15s;
    }

    .appear-enter,
    .appear-leave-to {
      opacity: 0;
      transform: translateY(-30px);
    }

    .expanded {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.8rem 1.2rem;
      margin-top: 1.6rem;
      background-color: var(--card-surface);
      border-radius: 0.4rem;

      .label {
        font-size: 1rem;
        font-weight: 400;
        color: var(--secondary-text);
      }

      .service-due {
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--base-text);
      }
    }
  }
}
</style>
