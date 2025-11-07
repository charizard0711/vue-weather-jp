<template>
  <div class="backdrop" @click.self="emit('close')">
    <div class="modal">
      <header class="modal-header">
        <div>
          <span class="section-label">現在の天気</span>
          <h2 class="title">{{ prefecture?.label ?? '–' }}</h2>
        </div>
        <button class="close-btn" @click="emit('close')" aria-label="閉じる">
          ✕
        </button>
      </header>

      <!-- ローディング -->
      <div v-if="isLoading" class="state">
        <span>読み込み中...</span>
      </div>

      <!-- エラー -->
      <div v-else-if="error" class="state state--error">
        <span>{{ error }}</span>
      </div>

      <!-- データあり -->
      <div v-else-if="weather" class="content">
        <div class="main-row">
          <div class="icon-block">
            <div class="weather-emoji">
              {{ emoji }}
            </div>
            <div>
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
            <span class="meta-value">{{ weather.cityName || prefecture?.label || '-' }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">湿度</span>
            <span class="meta-value">{{ weather.humidity }}%</span>
          </div>
        </div>
      </div>

      <!-- まだデータ無し（理論上ほぼ来ない） -->
      <div v-else class="state">
        <span>天気情報がありません。</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefecture: Object,
  weather: Object,
  isLoading: Boolean,
  error: String
})

const emit = defineEmits(['close'])

/**
 * weatherMain / description から
 * シンプルな絵文字アイコンを選ぶ
 */
const emoji = computed(() => {
  const main = (props.weather?.weatherMain || '').toLowerCase()
  const desc = (props.weather?.weatherDesc || '').toLowerCase()

  if (main.includes('thunder') || desc.includes('雷')) return '⛈️'
  if (main.includes('snow') || desc.includes('雪')) return '❄️'
  if (main.includes('rain') || desc.includes('雨')) return '🌧️'
  if (main.includes('drizzle')) return '🌦️'
  if (main.includes('cloud') || desc.includes('曇')) return '☁️'
  if (main.includes('clear') || desc.includes('晴')) return '☀️'
  if (main.includes('mist') || main.includes('fog') || desc.includes('霧')) return '🌫️'

  // よくわからないとき
  return '🌡️'
})
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 10% 0%, rgba(59, 130, 246, 0.25), rgba(15, 23, 42, 0.9));
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
}

.modal {
  width: min(420px, 90vw);
  border-radius: 24px;
  padding: 20px 22px 22px;
  background: radial-gradient(circle at 0% 0%, #1d4ed8, #020617 70%);
  color: #e5e7eb;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9ca3af;
}

.title {
  margin-top: 4px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.close-btn {
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 6px;
}

/* 状態表示 */
.state {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #e5e7eb;
}

.state--error {
  color: #fecaca;
}

/* コンテンツ */

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.icon-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* ★ シンプルな絵文字アイコンを大きめに */
.weather-emoji {
  font-size: 52px;
}

.condition-ja {
  font-size: 18px;
  font-weight: 600;
}

.condition-en {
  font-size: 13px;
  color: #9ca3af;
}

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
  font-size: 40px;
  font-weight: 700;
}

.temp-unit {
  font-size: 18px;
  margin-bottom: 5px;
}

.temp-feels {
  font-size: 13px;
  color: #d1d5db;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
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
