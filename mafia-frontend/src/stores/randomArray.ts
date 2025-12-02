import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AnswerOption {
  text: string
  correct: boolean
}

export const useRandomArray = defineStore('randomArray', () => {
  const firstCorrectAnswer = ref<number>(0)
  const secondCorrectAnswer = ref<number>(0)
  const randomAnswersArray = ref<AnswerOption[]>([])
  const randomNumberToSolve = ref<number>(0)

  function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array]
    let currentIndex = shuffled.length

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex]
      ]
    }

    return shuffled
  }

  function randomNumberGeneratorToSolve() {
    randomNumberToSolve.value = Math.floor(Math.random() * 20) + 1

    firstCorrectAnswer.value = Math.floor(Math.random() * (randomNumberToSolve.value + 1))
    secondCorrectAnswer.value = randomNumberToSolve.value - firstCorrectAnswer.value

    // Create the correct answer
    const correctAnswer: AnswerOption = {
      text: `${firstCorrectAnswer.value} + ${secondCorrectAnswer.value}`,
      correct: true
    }

    // Generate two incorrect answers
    const incorrectAnswers: AnswerOption[] = []

    // Generate first incorrect answer (ensure it doesn't equal the correct sum)
    let wrongFirst = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
    let wrongSecond = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
    // Make sure it's different from the correct answer
    while (
      wrongFirst + wrongSecond === randomNumberToSolve.value ||
      (wrongFirst === firstCorrectAnswer.value && wrongSecond === secondCorrectAnswer.value)
    ) {
      wrongFirst = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
      wrongSecond = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
    }
    incorrectAnswers.push({
      text: `${wrongFirst} + ${wrongSecond}`,
      correct: false
    })

    // Generate second incorrect answer
    let wrongFirst2 = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
    let wrongSecond2 = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
    // Make sure it's different from the correct answer and the first incorrect answer
    while (
      wrongFirst2 + wrongSecond2 === randomNumberToSolve.value ||
      (wrongFirst2 === firstCorrectAnswer.value && wrongSecond2 === secondCorrectAnswer.value) ||
      (wrongFirst2 === wrongFirst && wrongSecond2 === wrongSecond)
    ) {
      wrongFirst2 = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
      wrongSecond2 = Math.floor(Math.random() * (randomNumberToSolve.value + 5))
    }
    incorrectAnswers.push({
      text: `${wrongFirst2} + ${wrongSecond2}`,
      correct: false
    })

    const allAnswers = [correctAnswer, ...incorrectAnswers]
    randomAnswersArray.value = shuffle(allAnswers)
  }

  return {
    firstCorrectAnswer,
    secondCorrectAnswer,
    randomAnswersArray,
    randomNumberToSolve,
    randomNumberGeneratorToSolve
  }
})
