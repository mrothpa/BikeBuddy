// src/composables/useAddSolutionsDescription.js
import { ref } from 'vue'
import useFetchProblemDetails from './useFetchProblemDetails' // Pfad zu deinem Composable anpassen!

export default function useAddSolutionsDescription() {
  const isLoadingSolutions = ref(false)
  const solutionsError = ref(null)

  // Erstelle EINE Instanz von useFetchProblemDetails außerhalb der Schleife
  const { fetchSolutions } = useFetchProblemDetails() // Ohne Argument, wenn es so vorgesehen ist

  /**
   * Fügt jedem Problem im Array die Beschreibungen seiner Lösungen hinzu.
   * @param {Array} problemsArray - Das Array von Problemen im JSON-Format.
   * @returns {Promise<Array>} Das aktualisierte Array von Problemen mit hinzugefügten Lösungsbeschreibungen.
   */
  const addSolutionsToProblems = async (problemsArray) => {
    if (!Array.isArray(problemsArray) || problemsArray.length === 0) {
      console.warn('Keine Probleme im Array vorhanden, um Lösungen hinzuzufügen.')
      return problemsArray
    }

    isLoadingSolutions.value = true
    solutionsError.value = null
    const problemsWithSolutions = []

    for (const problem of problemsArray) {
      if (!problem || !problem.id) {
        console.warn('Problemobjekt ohne ID gefunden, überspringe Solutions-Abruf:', problem)
        problemsWithSolutions.push({ ...problem, solutions_description: '' })
        continue
      }

      try {
        // Rufe fetchSolutions jetzt mit der problem.id als Argument auf
        const solutions = await fetchSolutions(problem.id) // Hier wird die ID übergeben
        // console.log(`Lösungen für Problem ${problem.id} abgerufen:`, solutions)

        let solutionsDescription = ''
        if (Array.isArray(solutions) && solutions.length > 0) {
          solutionsDescription = solutions
            .map((solution) => solution.description)
            .filter(Boolean)
            .join('; ')
        }

        problemsWithSolutions.push({ ...problem, solutions_description: solutionsDescription })
      } catch (err) {
        solutionsError.value = `Fehler beim Abrufen der Lösungen für Problem ${problem.id}: ${err.message}`
        console.error(solutionsError.value, err)
        problemsWithSolutions.push({ ...problem, solutions_description: '' })
      }
    }

    isLoadingSolutions.value = false
    return problemsWithSolutions
  }

  return {
    isLoadingSolutions,
    solutionsError,
    addSolutionsToProblems,
  }
}
