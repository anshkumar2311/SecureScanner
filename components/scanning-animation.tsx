"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface ScanningAnimationProps {
  progress: number
  stage: string
}

export function ScanningAnimation({ progress, stage }: ScanningAnimationProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">
          {stage}
          {dots}
        </p>
        <span className="text-sm">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />

      <div className="grid grid-cols-4 gap-1 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-1 rounded-full ${progress >= (i + 1) * 25 ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        Scanning target for security vulnerabilities. This may take a moment...
      </p>
    </div>
  )
}

