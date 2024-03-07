<template>
  <div v-if="services" class="wrap-services">
    <p class="title">My subscriptions</p>
    <!-- <button @click="toggleView">
      Switch to {{ isGridView ? "list" : "grid" }} view
    </button> -->
    <ul :class="{ grid: isGridView }">
      <li v-for="(item, index) in services" :key="index" class="service-card">
        <div class="collapsed">
          <div class="wrap-service-name">
            <img :src="getIcon(item.service_id)" alt="" />
            <div class="wrap">
              <p>{{ item.service_name }}</p>
              <div class="more-info">
                <!-- <IconsCalendar /> -->
                <p class="service-due">{{ formatDate(item.service_due) }}</p>
              </div>
            </div>
          </div>
          <div class="wrap-cost">
            <p class="sevice-cost">R${{ item.service_cost.toFixed(2) }}</p>

            <p class="charge-frequency">
              {{ item.service_charge_frequency }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  services: Array,
  item: Object,
});

let isGridView = ref(false);

const toggleView = () => {
  isGridView.value = !isGridView.value;
};

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};
</script>

<style lang="scss" scoped>
.wrap-services {
  .title {
    font-size: 1rem;
    font-weight: 400;
    color: var(--secondary-text);
    margin-bottom: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  ul.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
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
    border-radius: 8px;
    background-color: var(--surface);
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: var(--card-surface);
    }

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
      gap: 1.6rem;

      img {
        width: 48px;
        height: 48px;
        border-radius: 0.6rem;
      }
      p {
        font-size: 1.2rem;
        font-weight: 300;
        color: var(--base-text);
      }

      .more-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.8rem;
        .service-due {
          font-size: 0.9rem;
          line-height: 100%;
          font-weight: 400;
          color: var(--secondary-text);
        }
        svg {
          width: 16px;
          height: 16px;
          stroke: var(--secondary-text);
        }
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
      flex-direction: column;
      align-items: flex-end;

      .sevice-cost {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--base-text);
      }

      .charge-frequency {
        font-size: 0.9rem;
        font-weight: 400;
        color: var(--secondary-text);
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
      justify-content: space-between;
      padding: 0.8rem 1.2rem;
      margin-top: 1.6rem;
      background-color: var(--background);
      border-radius: 0.4rem;

      .label {
        font-size: 1rem;
        font-weight: 400;
        color: var(--secondary-text);
      }

      .service-due {
        font-size: 1rem;
        font-weight: 400;
        color: var(--secondary-text);
      }
    }
  }
}
</style>
