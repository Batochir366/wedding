import type { ComponentType, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base: IconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '1em',
  height: '1em',
  'aria-hidden': true,
  focusable: false,
}

const stroke: IconProps = {
  ...base,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const DoveIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M4 47c11 8 24 11 38 9l-3 20c-.2 1.4 1.5 2.2 2.4 1.1L57 58c12-1.4 22-6 28-14 4.4-5.8 6.4-12 6.9-17.6l6.4-5.6c1-.9.5-2.6-.9-2.7l-8.2-.8C86.7 11 81.4 7 74.8 7 66.4 7 59.6 13.6 59 22c-7 .8-13.6 3.4-19 7.6-1 .8-.3 2.5 1 2.3 4.6-.7 8.7-.6 12.3.2C43.6 37 31 39 14.7 38.6c-1.7 0-2.5 2-1.2 3L4 47Z" />
    <circle cx="76.5" cy="21.5" r="2.6" fill="#fff" />
  </svg>
)

export const HeartIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

export const BalloonIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <path d="M12 2.5c3.3 0 5.8 2.6 5.8 6 0 4-3.3 7.4-5.8 8.6-2.5-1.2-5.8-4.6-5.8-8.6 0-3.4 2.5-6 5.8-6Z" />
    <path d="m10.8 17.1 1.2 1.6 1.2-1.6" />
    <path d="M12 18.7c0 1.5 1.6 1.4 1.6 2.8" />
  </svg>
)

export const RingsIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <circle cx="9" cy="15" r="5.2" />
    <circle cx="15.6" cy="14.2" r="5.2" />
    <path d="m12.4 8.6 1.7-3.2h3l1.7 3.2" />
    <path d="m15.6 2.8 1.5 2.6h-3l1.5-2.6Z" />
  </svg>
)

export const PlayIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5.6c0-.8.9-1.3 1.6-.9l9 6.4c.6.4.6 1.4 0 1.8l-9 6.4c-.7.5-1.6 0-1.6-.9V5.6Z" />
  </svg>
)

export const UserIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
  </svg>
)

export const MailIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
)

export const PhoneIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

export const MapPinIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
)

export const FacebookIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.25c0-.84.24-1.4 1.44-1.4H16.4V5.26c-.26-.04-1.15-.11-2.18-.11-2.16 0-3.64 1.32-3.64 3.74v2.21H8.2V14h2.38v7h2.92Z" />
  </svg>
)

export const TwitterIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.53 3h2.97l-6.49 7.42L21.75 21h-5.97l-4.68-6.12L5.74 21H2.77l6.94-7.93L2.25 3h6.12l4.23 5.6L17.53 3Zm-1.04 16.23h1.64L7.6 4.68H5.83l10.66 14.55Z" />
  </svg>
)

export const InstagramIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
  </svg>
)

export const PinterestIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 4 5.84 4 9.06c0 1.95.74 3.69 2.32 4.34.26.11.49 0 .57-.29l.23-.9c.08-.29.05-.39-.17-.64-.47-.56-.77-1.28-.77-2.3 0-2.96 2.22-5.62 5.78-5.62 3.15 0 4.88 1.93 4.88 4.5 0 3.38-1.5 6.24-3.72 6.24-1.23 0-2.15-1.02-1.85-2.26.35-1.49 1.04-3.09 1.04-4.16 0-.96-.51-1.76-1.58-1.76-1.25 0-2.26 1.29-2.26 3.02 0 1.1.37 1.84.37 1.84s-1.27 5.37-1.49 6.31c-.44 1.85-.07 4.12-.04 4.35.02.14.2.17.28.07.12-.15 1.6-1.98 2.11-3.81.14-.52.81-3.2.81-3.2.4.76 1.57 1.43 2.81 1.43 3.7 0 6.21-3.4 6.21-7.95C19.53 5.07 16.6 2 12 2Z" />
  </svg>
)

export const GoogleIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.35 11.1h-9.17v2.96h5.27c-.23 1.36-1.6 3.99-5.27 3.99-3.17 0-5.76-2.63-5.76-5.86s2.59-5.86 5.76-5.86c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.77 3.79 14.6 2.8 12.18 2.8 7.1 2.8 3 6.9 3 12s4.1 9.2 9.18 9.2c5.3 0 8.82-3.72 8.82-8.97 0-.6-.06-1.06-.15-1.13Z" />
  </svg>
)

export const PlusIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const CloseIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const ArrowUpIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...stroke} viewBox="0 0 24 24" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const icons = {
  dove: DoveIcon,
  heart: HeartIcon,
  balloon: BalloonIcon,
  rings: RingsIcon,
  play: PlayIcon,
  user: UserIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  mapPin: MapPinIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
  google: GoogleIcon,
  plus: PlusIcon,
  close: CloseIcon,
  menu: MenuIcon,
  arrowUp: ArrowUpIcon,
  chevronDown: ChevronDownIcon,
} satisfies Record<string, ComponentType<IconProps>>

export type IconName = keyof typeof icons

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = icons[name]
  return <Component {...props} />
}
