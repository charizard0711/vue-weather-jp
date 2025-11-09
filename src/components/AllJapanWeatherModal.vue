<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <header class="modal-header">
        <h2>全国の天気一覧</h2>
        <button class="close-btn" @click="close">×</button>
      </header>

      <div class="modal-body">
        <PrefectureWeatherList />
      </div>
    </div>
  </div>
</template>

<script setup>
import PrefectureWeatherList from "./PrefectureWeatherList.vue";

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 40;
}
.modal {
  width: min(100% - 40px, 900px);
  max-height: 80vh;
  border-radius: 20px;
  background: radial-gradient(circle at 0% 0%, #1f2937, #020617);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.4);
}

.modal-body {
  padding: 12px 18px 18px;
  overflow: auto;
}

.close-btn {
  border: none;
  background: transparent;
  color: #e5e7eb;
  font-size: 20px;
  cursor: pointer;
}
</style>
