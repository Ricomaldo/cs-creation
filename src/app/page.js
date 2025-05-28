'use client'
import { useState } from 'react'
import { OnboardingSequence } from '@/components/onboarding/OnboardingSequence/OnboardingSequence'
import { WelcomeTransition } from '@/components/onboarding/WelcomeTransition/WelcomeTransition'
import { GalleryLayout } from '@/components/layout/GalleryLayout/GalleryLayout'

export default function HomePage() {
  const [currentPhase, setCurrentPhase] = useState('onboarding') // 'onboarding', 'welcome', 'gallery'

  const handleOnboardingComplete = () => {
    setCurrentPhase('welcome')
  }

  const handleWelcomeComplete = () => {
    setCurrentPhase('gallery')
  }

  const handleRestartIntro = () => {
    setCurrentPhase('onboarding')
  }

  return (
    <main>
      {currentPhase === 'onboarding' && (
        <OnboardingSequence onComplete={handleOnboardingComplete} />
      )}
      
      {currentPhase === 'welcome' && (
        <WelcomeTransition onComplete={handleWelcomeComplete} />
      )}
      
      {currentPhase === 'gallery' && (
        <GalleryLayout onRestartIntro={handleRestartIntro} />
      )}
    </main>
  )
}