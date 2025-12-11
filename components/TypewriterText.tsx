"use client"

import { useEffect, useState } from "react"

export default function TypewriterText({
  phrases,
  speed = 100,
  deleteSpeed = 50,
  delayBetweenPhrases = 2000,
}: {
  phrases: string[]
  speed?: number
  deleteSpeed?: number
  delayBetweenPhrases?: number
}) {
  const [displayText, setDisplayText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText === currentPhrase) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), delayBetweenPhrases)
    } else if (isDeleting && displayText === "") {
      // Finished deleting, move to next phrase
      setIsDeleting(false)
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
    } else if (!isDeleting) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1))
      }, speed)
    } else {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, deleteSpeed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentPhraseIndex, isDeleting, phrases, speed, deleteSpeed, delayBetweenPhrases])

  return (
    <span className="inline">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
