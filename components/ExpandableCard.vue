<template>
  <div class="card" @click="toggle">
    <div class="collapsed">Content</div>

    <Motion :style="styleProps" class="expanded" v-if="isExpanded">
      <div ref="content" class="content">More content</div>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

const isExpanded = ref(false);
const content = ref(null);

const styleProps = ref({ height: "0px", overflow: "hidden" });

const toggle = async () => {
  isExpanded.value = !isExpanded.value;

  await nextTick();

  styleProps.value = isExpanded.value
    ? { height: `${content.value.scrollHeight}px`, overflow: "visible" }
    : { height: "0px", overflow: "hidden" };
};

onMounted(toggle);
</script>

<style scoped>
.card {
  border: 1px solid #000;
  padding: 1rem;
  margin: 1rem;
  cursor: pointer;
  font-size: 1.4rem;
}
</style>
