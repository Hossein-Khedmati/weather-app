import i18n from "i18next";

export function mapWeatherCode(code: number) {
  const isFa = i18n.language === "fa";

  const weatherMap: Record<number, { label: string; icon: string }> = {
    0: { label: isFa ? "آسمان صاف" : "Clear sky", icon: "☀️" },
    1: { label: isFa ? "صاف تا کمی ابری" : "Mainly clear", icon: "🌤️" },
    2: { label: isFa ? "نیمه‌ابری" : "Partly cloudy", icon: "⛅" },
    3: { label: isFa ? "ابری" : "Overcast", icon: "☁️" },
    45: { label: isFa ? "مه" : "Fog", icon: "🌫️" },
    48: { label: isFa ? "مه یخ‌زده" : "Rime fog", icon: "🌫️" },
    51: { label: isFa ? "نم‌نم باران" : "Light drizzle", icon: "🌦️" },
    61: { label: isFa ? "باران سبک" : "Light rain", icon: "🌧️" },
    63: { label: isFa ? "باران متوسط" : "Moderate rain", icon: "🌧️" },
    65: { label: isFa ? "باران شدید" : "Heavy rain", icon: "🌧️" },
    71: { label: isFa ? "برف" : "Snow fall", icon: "❄️" },
    80: { label: isFa ? "رگبار" : "Rain showers", icon: "🌦️" },
    95: { label: isFa ? "رعد و برق" : "Thunderstorm", icon: "⛈️" },
  };

  return weatherMap[code] || { label: isFa ? "نامشخص" : "Unknown", icon: "❔" };
}
