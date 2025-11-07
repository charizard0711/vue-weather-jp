<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="logo">
        <div class="logo-mark" />
        <span class="logo-text">日本の天気</span>
      </div>
      <span class="tagline">地図の上にカーソルを置いてクリックすると天気が見られます。</span>
    </header>

    <main class="app-main">
      <section class="map-section">
        <JapanMap @select="handleSelectPref" />
      </section>

      <!-- モーダル -->
      <WeatherModal
        v-if="showModal"
        :prefecture="selectedPref"
        :weather="weather"
        :is-loading="isLoading"
        :error="errorMessage"
        @close="closeModal"
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import JapanMap from './components/JapanMap.vue'
import WeatherModal from './components/WeatherModal.vue'
import { fetchCurrentWeather } from './services/weatherApi'

const selectedPref = ref(null)
const weather = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const showModal = ref(false)

function closeModal() {
  showModal.value = false
}

async function handleSelectPref(pref) {
  selectedPref.value = pref
  showModal.value = true
  weather.value = null
  errorMessage.value = ''

  try {
    isLoading.value = true
    const data = await fetchCurrentWeather(pref.lat, pref.lon)
    weather.value = data
  } catch (err) {
    console.error(err)
    errorMessage.value = '取得に失敗しました。少し時間をおいて再度お試しください。'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  padding: 24px 32px;
  background: radial-gradient(circle at 0% 0%, #312e81, #020617 55%, #0f172a);
  color: #e5e7eb;
  box-sizing: border-box;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-mark {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: conic-gradient(
    from 220deg,
    #22c55e,
    #22d3ee,
    #3b82f6,
    #6366f1,
    #ec4899,
    #f97316,
    #facc15,
    #22c55e
  );
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.6), 0 10px 18px rgba(15, 23, 42, 0.7);
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.tagline {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9ca3af;
}

.app-main {
  position: relative;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-section {
  width: min(100%, 980px);
  height: min(100%, 620px);
}
</style>
