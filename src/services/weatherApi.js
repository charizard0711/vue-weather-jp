// ここで trim() しておくのがミソ
const API_KEY = (import.meta.env.VITE_OPENWEATHER_API_KEY || '').trim()
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function fetchCurrentWeather(lat, lon) {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`

  const res = await fetch(url)

  if (!res.ok) {
    const text = await res.text()
    console.error('Weather API error', res.status, text)
    throw new Error(`API Error: ${res.status}`)
  }

  const data = await res.json()

  return {
    cityName: data.name,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    weatherMain: data.weather[0]?.main ?? '',
    weatherDesc: data.weather[0]?.description ?? '',
    icon: data.weather[0]?.icon ?? '',
  }
}
