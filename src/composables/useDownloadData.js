// src/composables/useDownloadData.js
import { ref } from 'vue'

export default function useDownloadData() {
  const isDownloading = ref(false)
  const downloadError = ref(null)

  const flattenObject = (obj = {}) => {
    const result = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key]
        if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
          Object.assign(result, flattenObject(value))
        } else {
          result[key] = value
        }
      }
    }
    return result
  }

  const downloadCsv = async (data, filename = 'daten.csv') => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('Keine Daten zum Herunterladen vorhanden.')
      return
    }

    isDownloading.value = true
    downloadError.value = null

    // Hilfsfunktion für Reverse Geocoding
    async function fetchAddress(lat, lon) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'BikeBuddy/1.0 (kontakt@example.com)', // Bitte ggf. anpassen
            'Accept-Language': 'de',
          },
        })
        if (!response.ok) throw new Error('API-Fehler')
        const json = await response.json()
        return {
          address: json.display_name || 'Keine Adresse in der Nähe',
          road: json.address && json.address.road ? json.address.road : 'Keine Adresse in der Nähe',
        }
      } catch (e) {
        console.error('Fehler beim Abrufen der Adresse:', e)
        return {
          address: 'Keine Adresse in der Nähe',
          road: 'Keine Adresse in der Nähe',
        }
      }
    }

    try {
      // Für jeden Punkt Adresse abfragen (synchron)
      const dataWithAddress = []
      for (const item of data) {
        let lat = item.latitude || item.lat
        let lon = item.longitude || item.lon
        let addressInfo = {
          address: 'Keine Adresse in der Nähe',
          road: 'Keine Adresse in der Nähe',
        }
        let osm_link = 'Kein Link verfügbar'
        if (lat && lon) {
          addressInfo = await fetchAddress(lat, lon)
          osm_link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`
        }
        dataWithAddress.push({
          ...item,
          address: addressInfo.address,
          road: addressInfo.road,
          osm_link,
        })
      }

      // Flatten each object in the array
      const flattenedData = dataWithAddress.map((item) => flattenObject(item))

      if (flattenedData.length === 0) {
        isDownloading.value = false
        return
      }

      // Füge die neuen Spalten hinzu, falls sie nicht existieren
      const allHeaders = new Set()
      flattenedData.forEach((obj) => Object.keys(obj).forEach((key) => allHeaders.add(key)))
      const headers = Array.from(allHeaders)
        .map((header) => `"${header.replace(/"/g, '""')}"`)
        .join(',')

      const rows = flattenedData.map((item) =>
        headers
          .replace(/"/g, '') // Entferne die Quotes für die Key-Zugriffe
          .split(',')
          .map(
            (key) =>
              `"${item[key] === null || item[key] === undefined ? '' : String(item[key]).replace(/"/g, '""')}"`,
          )
          .join(','),
      )

      const csvContent = [headers, ...rows].join('\n')
      const blob = new Blob(['\ufeff', csvContent], { type: 'text/csv;charset=utf-8;' }) // Add BOM for UTF-8

      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      isDownloading.value = false
    } catch (error) {
      console.error('Fehler beim Erstellen oder Herunterladen der CSV-Datei:', error)
      downloadError.value = error.message
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    downloadError,
    downloadCsv,
  }
}
