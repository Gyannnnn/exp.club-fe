import CTAbutton from '@/components/CTAbutton'
import React from 'react'

export default function page() {
  return (
    <div className='h-full w-full flex items-start  sm:mt-56 mt-10'>
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Build Better Habits, <span>Together</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          HabitForge helps you build lasting habits through tracking, community support, and friendly competition. Join others on the journey to self-improvement.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <CTAbutton/>       
        </div>
      </section>
    </div>
  )
}
