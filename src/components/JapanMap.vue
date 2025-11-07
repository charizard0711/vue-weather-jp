<template>
  <div class="map-wrapper">
    <div class="map-inner">
      <!-- 日本地図画像 -->
      <img :src="japanMap" alt="日本地図" class="map-image" />

      <!-- 都道府県ポイント（ホバーで県名、クリックでモーダル） -->
      <button
        v-for="pref in prefectures"
        :key="pref.id"
        class="pref-point"
        :data-active="pref.id === hoveredId"
        :style="{
          top: pref.top + '%',
          left: pref.left + '%'
        }"
        @mouseenter="hoveredId = pref.id"
        @mouseleave="hoveredId = null"
        @click="selectPref(pref)"
      >
        <span class="pref-dot" />
        <span class="pref-label">
          {{ pref.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import japanMap from '../assets/japan-map.png'

const emit = defineEmits(['select'])
const hoveredId = ref(null)

/**
 * 47 都道府県全部やると超長くなるので、
 * ひとまず「主要な都市がある県」を中心にサンプルを置いています。
 * 同じ形式でオブジェクトを追加していけばどんどん増やせます。
 */
const prefectures = [
  // 北海道・東北
  {
    id: 'hokkaido',
    label: '北海道',
    lat: 43.06417,
    lon: 141.34694,
    top: 16,
    left: 68
  },
  {
    id: 'miyagi',
    label: '宮城',
    lat: 38.2688,
    lon: 140.8721,
    top: 48,
    left: 62
  },
  // 関東
  {
    id: 'tokyo',
    label: '東京',
    lat: 35.6895,
    lon: 139.6917,
    top: 66.5,
    left: 57
  },
  {
    id: 'kanagawa',
    label: '神奈川',
    lat: 35.4478,
    lon: 139.6425,
    top: 69,
    left: 57
  },
  // 中部
  {
    id: 'aichi',
    label: '愛知',
    lat: 35.1802,
    lon: 136.9066,
    top: 71,
    left: 49
  },
  {
    id: 'niigata',
    label: '新潟',
    lat: 37.9026,
    lon: 139.0236,
    top: 55,
    left: 55
  },
  // 近畿
  {
    id: 'osaka',
    label: '大阪',
    lat: 34.6937,
    lon: 135.5023,
    top: 72,
    left: 43
  },
  {
    id: 'kyoto',
    label: '京都',
    lat: 35.0116,
    lon: 135.7681,
    top: 68,
    left: 43
  },
  // 中国・四国
  {
    id: 'hiroshima',
    label: '広島',
    lat: 34.3853,
    lon: 132.4553,
    top: 71.5,
    left: 34
  },
  {
    id: 'kagawa',
    label: '香川',
    lat: 34.3401,
    lon: 134.0434,
    top: 74.5,
    left: 37.5
  },
  // 九州・沖縄
  {
    id: 'fukuoka',
    label: '福岡',
    lat: 33.5902,
    lon: 130.4017,
    top: 77,
    left: 26.5
  },
  {
    id: 'kagoshima',
    label: '鹿児島',
    lat: 31.5602,
    lon: 130.5581,
    top: 88,
    left: 26
  },
  {
    id: 'okinawa',
    label: '沖縄',
    lat: 26.2125,
    lon: 127.6811,
    top: 92,
    left: 52
  }
]

function selectPref(pref) {
  emit('select', pref)
}
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.7);
}

/* 地図画像を中央に大きく表示 */
.map-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 都道府県ポイント */
.pref-point {
  position: absolute;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 小さい丸 */
.pref-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #111827;
  box-shadow: 0 0 0 2px #ffffff, 0 0 12px rgba(15, 23, 42, 0.5);
}

/* 県名ラベル（ホバー時だけ出る） */
.pref-label {
  position: relative;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.92);
  color: #f9fafb;
  font-size: 11px;
  letter-spacing: 0.06em;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(2px);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

/* ホバー中 or active ならラベル表示 */
.pref-point:hover .pref-label,
.pref-point[data-active='true'] .pref-label {
  opacity: 1;
  transform: translateY(0);
}
</style>
