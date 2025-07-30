import { useState } from 'react'

interface GameScenario {
  id: string
  title: string
  description: string
  question: string
  options: string[]
  correctAnswer: number
  points: number
}

const mockScenarios: GameScenario[] = [
  {
    id: '1',
    title: 'HIPAA Privacy Scenario',
    description: 'A colleague asks you to share patient information over email for a consultation.',
    question: 'What should you do?',
    options: [
      'Share the information immediately to help the patient',
      'Use secure, encrypted communication channels',
      'Ask the patient for permission first',
      'Decline to share any information'
    ],
    correctAnswer: 1,
    points: 100
  },
  {
    id: '2',
    title: 'Code of Conduct Scenario',
    description: 'You witness a colleague making inappropriate comments to a team member.',
    question: 'What is the most appropriate action?',
    options: [
      'Ignore it if it\'s not directed at you',
      'Tell your colleague to stop privately',
      'Report it to HR or management',
      'Join in to fit in with the team'
    ],
    correctAnswer: 2,
    points: 150
  }
]

export default function PlayGame() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const scenario = mockScenarios[currentScenario]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    setShowResult(true)
    
    if (selectedAnswer === scenario.correctAnswer) {
      setScore(score + scenario.points)
    }
    
    setTimeout(() => {
      if (currentScenario < mockScenarios.length - 1) {
        setCurrentScenario(currentScenario + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameCompleted(true)
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentScenario(0)
    setSelectedAnswer(null)
    setScore(0)
    setGameCompleted(false)
    setShowResult(false)
  }

  if (gameCompleted) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Complete!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Great job! You've completed the training module.
            </p>
            <div className="bg-primary-50 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-primary-600">Final Score: {score} points</div>
              <div className="text-sm text-gray-600">
                {score >= 200 ? 'Excellent!' : score >= 100 ? 'Good job!' : 'Keep practicing!'}
              </div>
            </div>
            <button
              onClick={resetGame}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Corporate Training Game</h1>
          <div className="text-right">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-xl font-bold text-primary-600">{score}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-600 text-white p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{scenario.title}</h2>
              <span className="text-sm opacity-90">
                Question {currentScenario + 1} of {mockScenarios.length}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {scenario.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {scenario.question}
              </h3>
            </div>

            <div className="space-y-3">
              {scenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    showResult
                      ? index === scenario.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : index === selectedAnswer
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 text-gray-500'
                      : selectedAnswer === index
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current mr-3 mt-0.5 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === scenario.correctAnswer && (
                      <svg className="flex-shrink-0 ml-auto h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                selectedAnswer === scenario.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className={`font-semibold ${
                  selectedAnswer === scenario.correctAnswer ? 'text-green-800' : 'text-red-800'
                }`}>
                  {selectedAnswer === scenario.correctAnswer 
                    ? `Correct! +${scenario.points} points` 
                    : 'Incorrect. The correct answer is highlighted above.'
                  }
                </div>
              </div>
            )}

            {!showResult && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}