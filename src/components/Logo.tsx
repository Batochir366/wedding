import { wedding } from '../data/site'
import { DoveIcon } from './Icons'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  const [brideInitial, groomInitial] = wedding.initials

  return (
    <a
      href="/"
      aria-label={`${wedding.groom} & ${wedding.bride}`}
      className={`inline-flex items-center font-heading leading-none text-primary ${className}`}
    >
      <span className="text-ink">{brideInitial}</span>
      <span className="px-1">&amp;</span>
      <span>{groomInitial}</span>
      <DoveIcon className="-ml-1 -translate-y-1 scale-x-[-1] text-[0.75em] text-primary" />
    </a>
  )
}
