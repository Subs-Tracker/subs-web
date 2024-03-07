<template>
  <div v-if="services" class="wrap-services">
    <div class="my-sub-header">
      <p class="title">My subscriptions</p>
      <div @click="toggleView" class="btn">
        <IconsList v-if="isGridView" />
        <IconsGrid v-else />
      </div>
    </div>
    <ul :class="isGridView ? 'view-grid' : 'view-list'">
      <li v-for="(item, index) in services" :key="index" class="service-card">
        <div class="service">
          <img :src="getIcon(item.service_id)" alt="" />
          <div class="service-info">
            <p>{{ item.service_name }}</p>
            <p class="service-due">{{ formatDate(item.service_due) }}</p>
          </div>
          <div class="service-cost">
            <p class="cost">R${{ item.service_cost.toFixed(2) }}</p>
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
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .my-sub-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 1rem;
      font-weight: 400;
      color: var(--secondary-text);
    }

    .btn {
      display: flex;
      padding: 0.4rem 0.4rem;
      border: none;
      border-radius: 56px;
      color: var(--base-text);
      cursor: pointer;
      transform: translateY(0);
      transition: transform opacity 0.15s ease-in-out;
      opacity: 0.7;

      &:hover {
        transform: translateY(4px);
        opacity: 1;
      }

      svg {
        width: 1.6rem;
        height: 1.6rem;
        stroke: var(--base-text);
      }
    }
  }

  .view-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;

    .service-card {
      position: relative;

      .service {
        display: grid;
        grid-template-areas:
          "top-left top-right"
          "bottom bottom";
        grid-template-columns: 6fr 1fr;
        grid-template-rows: 1fr;
        align-items: flex-start;
        gap: 2.4rem;

        p {
          line-height: 120%;
        }

        img {
          grid-area: top-right;
        }
        .service-info {
          grid-area: top-left;
          gap: 0.4rem;
        }
        .service-cost {
          grid-area: bottom;
          flex-direction: row-reverse;
          justify-content: space-between;
          gap: 0.8rem;
          margin-left: 0;
        }
      }
    }
  }

  .view-list {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .service-card {
    display: flex;
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

    .service {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 1.6rem;
    }

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

    .service-info {
      display: flex;
      flex-direction: column;

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

    .service-cost {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: auto;

      .cost {
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
  }
}
</style>
