<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="logo">
        <div class="logo-mark" />
        <span class="logo-text">日本の天気</span>
      </div>
      <div class="header-right">
        <span class="tagline">
          地図の上にカーソルを置いてクリックすると天気が見られます。
        </span>
        <button class="list-btn" @click="showListModal = true">
          全国の天気一覧
        </button>
      </div>
    </header>

    <main class="app-main">
      <section class="map-section">
        <JapanMap @select="handleSelectPref" />
      </section>

      <!-- 1地点の詳細モーダル -->
      <WeatherModal
        v-if="showModal"
        :prefecture="selectedPref"
        :weather="weather"
        :is-loading="isLoading"
        :error="errorMessage"
        @close="closeModal"
      />

      <!-- 全国一覧モーダル -->
      <AllJapanWeatherModal
        v-if="showListModal"
        @close="showListModal = false"
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import JapanMap from "./components/JapanMap.vue";
import WeatherModal from "./components/WeatherModal.vue";
import AllJapanWeatherModal from "./components/AllJapanWeatherModal.vue";
import { fetchCurrentWeather } from "./services/weatherApi";

const selectedPref = ref(null);
const weather = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");
const showModal = ref(false);
const showListModal = ref(false);

function closeModal() {
  showModal.value = false;
}

async function handleSelectPref(pref) {
  selectedPref.value = pref;
  showModal.value = true;
  weather.value = null;
  errorMessage.value = "";

  try {
    isLoading.value = true;
    const data = await fetchCurrentWeather(pref.lat, pref.lon);
    weather.value = data;
  } catch (err) {
    console.error(err);
    errorMessage.value =
      "取得に失敗しました。少し時間をおいて再度お試しください。";
  } finally {
    isLoading.value = false;
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

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tagline {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9ca3af;
}

.list-btn {
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 999px;
  border: 1px solid rgba(248, 250, 252, 0.12);
  cursor: pointer;

  /* オレンジ系グラデーション */
  background: linear-gradient(135deg, #f97316, #fb923c);
  color: #111827;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  /* 立体感＋ぼわっと光る感じ */
  box-shadow:
    0 8px 18px rgba(15, 23, 42, 0.8),
    0 0 12px rgba(249, 115, 22, 0.6);

  /* なめらかなアニメーション */
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

  /* 点滅（ゆるく明るくなったり暗くなったり） */
  animation: pulse-orange 1.6s ease-in-out infinite;
}

/* ホバー時はちょっと浮く＆光を強める */
.list-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
  box-shadow:
    0 12px 24px rgba(15, 23, 42, 0.9),
    0 0 18px rgba(249, 115, 22, 0.9);
}

/* クリック中は沈む感じ */
.list-btn:active {
  transform: translateY(1px);
  box-shadow:
    0 4px 10px rgba(15, 23, 42, 0.7),
    0 0 8px rgba(249, 115, 22, 0.7);
}

/* 点滅（明るさ＋影でふわっと脈打つ感じ） */
@keyframes pulse-orange {
  0%,
  100% {
    filter: brightness(1);
    box-shadow:
      0 8px 18px rgba(15, 23, 42, 0.8),
      0 0 10px rgba(249, 115, 22, 0.4);
  }
  50% {
    filter: brightness(1.2);
    box-shadow:
      0 10px 22px rgba(15, 23, 42, 0.9),
      0 0 18px rgba(249, 115, 22, 0.9);
  }
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
