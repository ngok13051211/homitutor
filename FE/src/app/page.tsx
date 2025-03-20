'use client'
import Header from '@/components/layout/Header'
import Hero from '@/components/Hero'
import TutorList from '@/components/tutor/TutorList'
import Testimonials from '@/components/Testimonials'
import BecomeTutor from '@/components/tutor/BecomeTutor'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TutorList />
      <Testimonials />
      <BecomeTutor />
    </main>
  )
}
