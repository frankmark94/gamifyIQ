"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus,
  FileText,
  Wand2,
  Settings,
  Edit,
  Trash2,
  Play
} from "lucide-react"

interface Game {
  id: string
  title: string
  description: string
  status: "DRAFT" | "ACTIVE" | "ARCHIVED"
  difficulty: "EASY" | "MEDIUM" | "HARD"
  totalPoints: number
  estimatedDuration: number
  averageScore: number
  completionCount: number
  scenarios: number
  documentName: string
  createdAt: string
  updatedAt: string
  thumbnail?: string
  topic: string
}

interface Document {
  id: string
  name: string
  status: "PROCESSED" | "PROCESSING" | "FAILED"
  games: number
}

interface GameBuilderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGameCreated: (game: Game) => void
}

interface GameScenario {
  id: string
  title: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  points: number
}

const mockDocuments: Document[] = [
  { id: "1", name: "HIPAA Privacy Policy", status: "PROCESSED", games: 12 },
  { id: "2", name: "Code of Conduct", status: "PROCESSED", games: 8 },
  { id: "3", name: "Data Protection Guidelines", status: "PROCESSED", games: 5 },
  { id: "4", name: "Financial Ethics Guidelines", status: "PROCESSED", games: 2 },
  { id: "5", name: "Safety Procedures Manual", status: "PROCESSED", games: 0 },
]

export function GameBuilderDialog({ 
  open, 
  onOpenChange, 
  onGameCreated 
}: GameBuilderDialogProps) {
  const [step, setStep] = useState<"select" | "configure" | "scenarios">("select")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [gameTitle, setGameTitle] = useState("")
  const [gameDescription, setGameDescription] = useState("")
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM")
  const [topic, setTopic] = useState("")
  const [scenarios, setScenarios] = useState<GameScenario[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document)
    setGameTitle(`${document.name} Training Game`)
    setGameDescription(`Interactive training scenarios based on ${document.name}`)
    setTopic(getTopicFromDocument(document.name))
    setStep("configure")
  }

  const getTopicFromDocument = (documentName: string): string => {
    if (documentName.toLowerCase().includes("hipaa")) return "Healthcare Compliance"
    if (documentName.toLowerCase().includes("conduct")) return "Ethics & Conduct"
    if (documentName.toLowerCase().includes("data")) return "Data Privacy"
    if (documentName.toLowerCase().includes("financial")) return "Financial Compliance"
    if (documentName.toLowerCase().includes("safety")) return "Safety & Emergency"
    return "General Training"
  }

  const generateScenarios = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockScenarios: GameScenario[] = [
      {
        id: "1",
        title: "Patient Information Handling",
        question: "A patient calls asking about their test results. What is the appropriate response?",
        options: [
          "Provide the results immediately since they're the patient",
          "Verify patient identity before discussing any information",
          "Tell them to call back later",
          "Transfer the call without verification"
        ],
        correctAnswer: 1,
        explanation: "HIPAA requires proper patient verification before sharing any protected health information.",
        points: 100
      },
      {
        id: "2", 
        title: "Information Sharing with Family",
        question: "A patient's spouse requests information about their partner's condition. How should you respond?",
        options: [
          "Share the information since they're married",
          "Refuse to share any information",
          "Check if the patient has authorized information sharing with their spouse",
          "Only share general information"
        ],
        correctAnswer: 2,
        explanation: "Patient authorization is required before sharing PHI with family members, even spouses.",
        points: 100
      },
      {
        id: "3",
        title: "Minimum Necessary Standard",
        question: "When accessing patient records, you should:",
        options: [
          "Access all available information for thoroughness",
          "Only access the minimum information necessary for your job function",
          "Access information for interesting cases",
          "Share access with colleagues to be helpful"
        ],
        correctAnswer: 1,
        explanation: "The minimum necessary standard requires accessing only the PHI needed for your specific job duties.",
        points: 100
      }
    ]
    
    setScenarios(mockScenarios)
    setIsGenerating(false)
    setStep("scenarios")
  }

  const handleCreateGame = () => {
    if (!selectedDocument) return

    const newGame: Game = {
      id: Math.random().toString(36).substr(2, 9),
      title: gameTitle,
      description: gameDescription, 
      status: "DRAFT",
      difficulty: difficulty,
      totalPoints: scenarios.reduce((sum, scenario) => sum + scenario.points, 0),
      estimatedDuration: scenarios.length * 2, // 2 minutes per scenario
      averageScore: 0,
      completionCount: 0,
      scenarios: scenarios.length,
      documentName: selectedDocument.name,
      topic: topic,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onGameCreated(newGame)
    
    // Reset form
    setStep("select")
    setSelectedDocument(null)
    setGameTitle("")
    setGameDescription("")
    setDifficulty("MEDIUM")
    setTopic("")
    setScenarios([])
  }

  const getDifficultyColor = (level: string) => {
    switch(level) {
      case "EASY": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "MEDIUM": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "HARD": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "select" && "Create New Game"}
            {step === "configure" && "Configure Game Settings"}
            {step === "scenarios" && "Review Game Scenarios"}
          </DialogTitle>
          <DialogDescription>
            {step === "select" && "Select a document to create training scenarios from"}
            {step === "configure" && "Customize your game settings and generate scenarios"}
            {step === "scenarios" && "Review and edit the generated scenarios"}
          </DialogDescription>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-4">
            <div className="grid gap-3">
              {mockDocuments.filter(doc => doc.status === "PROCESSED").map((document) => (
                <Card 
                  key={document.id} 
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleDocumentSelect(document)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">{document.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {document.games} games created
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Ready</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === "configure" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Game Title</label>
              <Input
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="Enter game title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={gameDescription}
                onChange={(e) => setGameDescription(e.target.value)}
                placeholder="Describe what players will learn"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Badge className={getDifficultyColor(difficulty)}>
                        {difficulty}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setDifficulty("EASY")}>
                      <Badge className={getDifficultyColor("EASY")}>EASY</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDifficulty("MEDIUM")}>
                      <Badge className={getDifficultyColor("MEDIUM")}>MEDIUM</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDifficulty("HARD")}>
                      <Badge className={getDifficultyColor("HARD")}>HARD</Badge>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Training topic"
                />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Source Document</span>
              </div>
              <p className="text-sm text-muted-foreground">{selectedDocument?.name}</p>
            </div>
          </div>
        )}

        {step === "scenarios" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Generated Scenarios</h3>
              <Badge variant="secondary">{scenarios.length} scenarios</Badge>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {scenarios.map((scenario, index) => (
                <Card key={scenario.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {index + 1}. {scenario.title}
                      </CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">{scenario.question}</p>
                    <div className="space-y-1">
                      {scenario.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`text-xs p-2 rounded ${
                            optIndex === scenario.correctAnswer
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Explanation:</strong> {scenario.explanation}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          {step === "select" && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          )}
          
          {step === "configure" && (
            <>
              <Button variant="outline" onClick={() => setStep("select")}>
                Back
              </Button>
              <Button 
                onClick={generateScenarios}
                disabled={!gameTitle.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Scenarios...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Scenarios
                  </>
                )}
              </Button>
            </>
          )}
          
          {step === "scenarios" && (
            <>
              <Button variant="outline" onClick={() => setStep("configure")}>
                Back
              </Button>
              <Button onClick={handleCreateGame}>
                <Plus className="mr-2 h-4 w-4" />
                Create Game
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}