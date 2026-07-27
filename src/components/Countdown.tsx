import { useEffect, useState } from 'react'
import { ui } from '../data/site'

interface TimeLeft {
  days: number
  hours: number
  mins: number
  secs: number
}

const boxes = [
  { key: 'days', label: ui.countdown.days },
  { key: 'hours', label: ui.countdown.hours },
  { key: 'mins', label: ui.countdown.mins },
  { key: 'secs', label: ui.countdown.secs },
] as const

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    mins: Math.floor((totalSeconds % 3600) / 60),
    secs: totalSeconds % 60,
  }
}

interface CountdownProps {
  date: string
}

export default function Countdown({ date }: CountdownProps) {
  const target = new Date(date).getTime()
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return (
    <div className="mt-6 flex justify-center gap-4 sm:gap-6 lg:mt-10 lg:justify-start lg:gap-10 xl:gap-12">
      {boxes.map(({ key, label }) => (
        <div key={key} className="text-center">
          <div className="font-heading text-[34px] leading-none text-text sm:text-[40px] lg:text-[50px] xl:text-[64px]">
            {String(timeLeft[key]).padStart(2, '0')}
          </div>
          <span className="mt-1 block text-sm text-text sm:text-base lg:text-xl xl:text-[25px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
