<template>
  <div v-if="services" class="wrap-services">
    <p class="my-services">My subscriptions</p>
    <ul v-for="(item, index) in services" :key="index" class="wrap-services">
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
</template>
<script setup lang="ts">
const props = defineProps({
  services: Array,
});
</script>
<style lang="scss" scoped>
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
