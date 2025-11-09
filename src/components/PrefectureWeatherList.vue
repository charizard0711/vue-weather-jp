<template>
  <div class="weather-list">
    <h2>全国の現在の天気</h2>

    <button @click="loadAll" :disabled="loading">
      {{ loading ? "読み込み中..." : "再読み込み" }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>

    <table v-if="rows.length">
      <thead>
        <tr>
          <th>都道府県</th>
          <th>気温</th>
          <th>天気</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.code">
          <td>{{ row.name }}</td>
          <td>
            <span v-if="row.weather">
              {{ row.weather.temperature.toFixed(1) }} ℃
            </span>
            <span v-else>取得中...</span>
          </td>
          <td>
            <span v-if="row.weather">
              <span class="icon">{{ getWeatherIcon(row.weather.code) }}</span>
            </span>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { prefectures } from "../data/prefectures";

const rows = ref(prefectures.map((p) => ({ ...p, weather: null })));
const loading = ref(false);
const error = ref("");

async function fetchWeather(p) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${p.lat}&longitude=${p.lon}` +
    `&current=temperature_2m,weather_code&timezone=Asia%2FTokyo`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("API error");
  }
  const data = await res.json();

  return {
    temperature: data.current.temperature_2m,
    code: data.current.weather_code,
  };
}

// 天気コード → 絵文字
function getWeatherIcon(code) {
  if (code === 0) return "☀️"; // 快晴
  if (code >= 1 && code <= 3) return "🌤️"; // 晴れ時々くもり
  if (code === 45 || code === 48) return "🌫️"; // 霧
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "🌧️"; // 雨
  if (code >= 71 && code <= 77) return "❄️"; // 雪
  if (code >= 95) return "⛈️"; // 雷雨
  return "☁️"; // その他はくもり扱い
}

async function loadAll() {
  loading.value = true;
  error.value = "";

  try {
    await Promise.all(
      rows.value.map(async (row) => {
        try {
          const weather = await fetchWeather(row);
          row.weather = weather;
        } catch (e) {
          row.weather = null;
        }
      })
    );
  } catch (e) {
    error.value = e.message ?? "天気の取得に失敗しました";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadAll();
});
</script>

<style scoped>
.weather-list {
  padding: 16px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(18px);
}

button {
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  padding: 6px 8px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3);
  text-align: center; /* ここを追加 */
}

.icon {
  font-size: 18px;
}

.error {
  color: #ff8080;
  margin-bottom: 8px;
}
</style>
