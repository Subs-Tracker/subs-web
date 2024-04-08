<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <button @click="closeModal">Close</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const { showModal } = toRefs(props);
const emit = defineEmits(["close-modal"]);

const closeModal = () => {
  emit("close-modal");
};

watch(showModal, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onMounted(() => {
  if (showModal.value) {
    document.body.style.overflow = "hidden";
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.modal {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: var(--background);
  z-index: 100;
}
</style>
