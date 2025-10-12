import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react'

interface WeatherData {
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=49.6337&longitude=-1.6225&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Europe%2FParis'
      )
      
      if (!response.ok) {
        throw new Error('Erreur réseau')
      }
      
      const data = await response.json()
      const current = data.current
      
      // Convertir le code météo en description
      const getWeatherDescription = (code: number) => {
        if (code === 0) return 'Ciel dégagé'
        if (code <= 3) return 'Partiellement nuageux'
        if (code <= 48) return 'Brouillard'
        if (code <= 67) return 'Pluie'
        if (code <= 77) return 'Neige'
        if (code <= 82) return 'Averses'
        return 'Orageux'
      }
      
      setWeather({
        temperature: Math.round(current.temperature_2m),
        description: getWeatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        icon: current.weather_code <= 1 ? 'sun' : current.weather_code <= 3 ? 'cloud' : 'rain'
      })
      
      setError('')
    } catch (err) {
      console.error('Erreur météo:', err)
      setError('Impossible de charger la météo')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
    const interval = setInterval(fetchWeather, 10 * 60 * 1000) // Mise à jour toutes les 10 minutes
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun className="w-12 h-12 text-yellow-500" />
      case 'cloud':
        return <Cloud className="w-12 h-12 text-gray-500" />
      case 'rain':
        return <CloudRain className="w-12 h-12 text-blue-500" />
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-xs">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Météo à Cherbourg</h2>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-xs">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Météo à Cherbourg</h2>
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
          <button 
            onClick={fetchWeather}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 max-w-xs">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Météo à Cherbourg</h2>
      
      {weather && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getWeatherIcon(weather.icon)}
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {weather.temperature}°C
                </div>
                <div className="text-gray-600 text-sm">
                  {weather.description}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {weather.humidity}% humidité
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {weather.windSpeed} km/h
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => window.open('https://meteofrance.com/previsions-meteo-france/cherbourg-octeville/50100', '_blank')}
            className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Voir sur Météo-France →
          </button>
        </div>
      )}
    </div>
  )
}

export default WeatherWidget