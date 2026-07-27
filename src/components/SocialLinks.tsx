import { FacebookIcon, GoogleIcon, InstagramIcon, PinterestIcon, TwitterIcon } from './Icons'

const networks = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Twitter', Icon: TwitterIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Pinterest', Icon: PinterestIcon },
] as const

const footerNetworks = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Twitter', Icon: TwitterIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Google', Icon: GoogleIcon },
] as const

interface SocialLinksProps {
  variant?: 'outline' | 'solid'
  className?: string
}

export default function SocialLinks({ variant = 'outline', className = '' }: SocialLinksProps) {
  const items = variant === 'outline' ? networks : footerNetworks

  return (
    <ul className={`flex gap-[15px] ${className}`}>
      {items.map(({ label, Icon }) => (
        <li key={label}>
          <a
            href="#"
            aria-label={label}
            className={
              variant === 'outline'
                ? 'flex size-10 items-center justify-center rounded-full border border-primary text-[15px] text-primary transition-colors duration-300 hover:bg-primary hover:text-white'
                : 'flex size-[42px] items-center justify-center rounded-full bg-white text-[18px] text-ink transition-colors duration-300 hover:bg-ink hover:text-white'
            }
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}
