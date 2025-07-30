"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Play,
  Edit,
  Copy,
  Archive,
  Trash2,
  MoreHorizontal,
  Clock,
  Users,
  Trophy,
  FileText,
  Gamepad2
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

interface GameLibraryViewProps {
  games: Game[]
  viewMode: "grid" | "list"
  onGameAction: (action: string, game: Game) => void
}

export function GameLibraryView({ games, viewMode, onGameAction }: GameLibraryViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: Game["status"]) => {
    const variants = {
      ACTIVE: "default" as const,
      DRAFT: "secondary" as const,
      ARCHIVED: "outline" as const,
    }
    const colors = {
      ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      DRAFT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", 
      ARCHIVED: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return <Badge className={colors[status]}>{status}</Badge>
  }

  const getDifficultyBadge = (difficulty: Game["difficulty"]) => {
    const colors = {
      EASY: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      MEDIUM: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      HARD: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return <Badge className={colors[difficulty]}>{difficulty}</Badge>
  }

  const GameActionMenu = ({ game }: { game: Game }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onGameAction("preview", game)}>
          <Play className="mr-2 h-4 w-4" />
          Preview Game
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onGameAction("edit", game)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Game
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onGameAction("duplicate", game)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {game.status === "ACTIVE" && (
          <DropdownMenuItem onClick={() => onGameAction("archive", game)}>
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
        )}
        {game.status === "DRAFT" && (
          <DropdownMenuItem onClick={() => onGameAction("activate", game)}>
            <Play className="mr-2 h-4 w-4" />
            Activate
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => onGameAction("delete", game)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (viewMode === "grid") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card key={game.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-6">{game.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(game.status)}
                    {getDifficultyBadge(game.difficulty)}
                  </div>
                </div>
                <GameActionMenu game={game} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {game.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground">
                    <FileText className="mr-1 h-3 w-3" />
                    {game.scenarios} scenarios
                  </span>
                  <span className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {game.estimatedDuration}m
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    {game.completionCount} plays
                  </span>
                  {game.averageScore > 0 && (
                    <span className="flex items-center text-muted-foreground">
                      <Trophy className="mr-1 h-3 w-3" />
                      {game.averageScore.toFixed(1)}% avg
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>From: {game.documentName}</span>
                  <span>Updated {formatDate(game.updatedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {games.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No games found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find games.
            </p>
          </div>
        )}
      </div>
    )
  }

  // List view
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Scenarios</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Completions</TableHead>
            <TableHead>Avg Score</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{game.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {game.topic} • From {game.documentName}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(game.status)}
              </TableCell>
              <TableCell>
                {getDifficultyBadge(game.difficulty)}
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">{game.scenarios}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">{game.estimatedDuration}m</div>
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">{game.completionCount}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">
                  {game.averageScore > 0 ? `${game.averageScore.toFixed(1)}%` : "-"}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(game.updatedAt)}
              </TableCell>
              <TableCell>
                <GameActionMenu game={game} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {games.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No games found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find games.
          </p>
        </div>
      )}
    </div>
  )
}