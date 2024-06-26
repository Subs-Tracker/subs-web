<template>
  <div v-if="services" class="wrap-services">
    <ul class="view-list">
      <li
        v-for="(item, index) in sortedServices"
        :key="index"
        class="service-card"
      >
        <img :src="getIcon(item.service_id)" alt="" />
        <div class="service-info">
          <p>{{ item.service_name }}</p>
          <!-- <p class="service-due">{{ formatDate(item.service_due) }}</p> -->
        </div>
        <div class="service-cost">
          <p class="cost">
            R${{
              (item.service_charge_frequency === "yearly"
                ? item.service_cost / 12
                : item.service_cost
              ).toFixed(2)
            }}
          </p>
          <p class="charge-frequency">
            <!-- {{ item.service_charge_frequency }} -->
          </p>
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

// Get service icons
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

//Order service list by price
const sortedServices = computed(() => {
  return [...props.services].sort((a, b) => {
    const aCost =
      a.service_charge_frequency === "yearly"
        ? a.service_cost / 12
        : a.service_cost;
    const bCost =
      b.service_charge_frequency === "yearly"
        ? b.service_cost / 12
        : b.service_cost;
    return bCost - aCost;
  });
});
</script>

<style lang="scss" scoped>
.wrap-services {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  .my-sub-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;

    .title {
      font-size: 1.6rem;
      font-weight: 400;
      color: var(--secondary-text);
    }
  }

  .view-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .service-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
    padding: 1.2rem;
    border-radius: 16px;
    background-color: var(--surface);
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: var(--card-surface);
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 0.6rem;
    }
    p {
      font-size: 1.6rem;
      font-weight: 400;
      color: var(--base-text);
    }

    .service-info {
      display: flex;
      flex-direction: column;

      .service-due {
        font-size: 1.2rem;
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
      padding-right: 0.8rem;

      .cost {
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--secondary-text);
      }

      .charge-frequency {
        font-size: 1rem;
        font-weight: 400;
        color: var(--secondary-text);
      }
    }
  }
}
</style>
