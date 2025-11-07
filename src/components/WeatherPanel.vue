<template>
  <div class="weather-card">
    <header class="weather-header">
      <span class="section-label">現在の天気</span>
      <h2 class="city-name">
        {{ city?.label ?? '–' }}
      </h2>
    </header>

    <!-- ローディング -->
    <div v-if="isLoading" class="state state--center">
      <span class="state-text">読み込み中...</span>
    </div>

    <!-- エラー -->
    <div v-else-if="error" class="state state--center state--error">
      <span class="state-text">{{ error }}</span>
    </div>

    <!-- データあり -->
    <div v-else-if="weather" class="weather-content">
      <div class="main-row">
        <div class="icon-block">
          <!-- ★ OpenWeather のアイコンを大きく＆白っぽく -->
          <img
            v-if="iconUrl"
            :src="iconUrl"
            alt="天気アイコン"
            class="weather-icon"
          />
          <div class="condition">
            <div class="condition-ja">
              {{ weather.weatherDesc || '-' }}
            </div>
            <div class="condition-en">
              {{ weather.weatherMain || '' }}
            </div>
          </div>
        </div>

        <div class="temp-block">
          <div class="temp-value">
            <span class="temp-number">{{ weather.temp }}</span>
            <span class="temp-unit">℃</span>
          </div>
          <div class="temp-feels">
            体感 {{ weather.feelsLike }}℃
          </div>
        </div>
      </div>

      <div class="meta-row">
        <div class="meta-item">
          <span class="meta-label">都市名</span>
          <span class="meta-value">
            {{ weather.cityName || city?.label || '-' }}
          </span>
        </div>
        <div class="meta-item">
          <span class="meta-label">湿度</span>
          <span class="meta-value">{{ weather.humidity }}%</span>
        </div>
      </div>
    </div>

    <!-- まだ都市が選ばれていないとき -->
    <div v-else class="state state--center">
      <span class="state-text">左の地図から都市を選択してください。</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  city: Object,
  weather: Object,
  isLoading: Boolean,
  error: String
})

const iconUrl = computed(() => {
  if (!props.weather?.icon) return ''
  return `https://openweathermap.org/img/wn/${props.weather.icon}@4x.png`
})
</script>

<style scoped>
.weather-card {
  width: 100%;
  max-width: 520px;
  /* ★ 縦はだいたい画面の半分くらいまでにする */
  min-height: 260px;
  max-height: 55vh;

  border-radius: 28px;
  padding: 24px 28px;
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.45);
  background: radial-gradient(circle at 0% 0%, #2563eb, #0f172a 70%, #020617);

  color: #e5e7eb;
  display: flex;
  flex-direction: column;
}

/* ヘッダー */
.weather-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9ca3af;
}

.city-name {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

/* ローディング／エラー／未選択 */
.state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state-text {
  font-size: 14px;
  color: #9ca3af;
}

.state--error .state-text {
  color: #fecaca;
}

/* メインコンテンツ */
.weather-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* アイコン＋天気 */

.icon-block {
  display: flex;
  align-items: center;
  gap: 18px;
}

/* ★ アイコン大きめ＋色を抑えめに */
.weather-icon {
  width: 96px;
  height: 96px;
  image-rendering: auto;
  /* カラーアイコンを少し白っぽく & コントラスト調整 */
  filter: grayscale(0.35) brightness(1.4) contrast(1.05);
}

.condition-ja {
  font-size: 18px;
  font-weight: 600;
}

.condition-en {
  font-size: 13px;
  color: #9ca3af;
}

/* 気温ブロック（右側） */
.temp-block {
  text-align: right;
}

.temp-value {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 4px;
}

.temp-number {
  font-size: 42px;
  font-weight: 700;
}

.temp-unit {
  font-size: 18px;
  margin-bottom: 6px;
}

.temp-feels {
  font-size: 13px;
  color: #d1d5db;
}

/* 下の小さい情報 */
.meta-row {
  display: flex;
  justify-content: flex-start;
  gap: 32px;
  font-size: 13px;
  color: #d1d5db;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9ca3af;
}

.meta-value {
  font-size: 14px;
}
</style>
