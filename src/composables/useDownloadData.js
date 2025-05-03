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

  const downloadCsv = (data, filename = 'daten.csv') => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('Keine Daten zum Herunterladen vorhanden.')
      return
    }

    isDownloading.value = true
    downloadError.value = null

    try {
      // Flatten each object in the array
      const flattenedData = data.map((item) => flattenObject(item))

      if (flattenedData.length === 0) {
        isDownloading.value = false
        return
      }

      const headers = Object.keys(flattenedData[0])
        .map((header) => `"${header.replace(/"/g, '""')}"`) // Escape double quotes in headers
        .join(',')

      const rows = flattenedData.map((item) =>
        Object.values(item)
          .map(
            (value) =>
              `"${value === null || value === undefined ? '' : String(value).replace(/"/g, '""')}"`,
          ) // Escape double quotes in values
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
