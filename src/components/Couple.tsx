import { couple } from '../data/site'
import Reveal from './Reveal'
import SocialLinks from './SocialLinks'

const [bride, groom] = couple

export default function Couple() {
  return (
    <section id="couple" className="section-padding relative z-10 scroll-mt-24 overflow-hidden md:scroll-mt-28">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <Reveal direction="left" className="w-full lg:w-[29%]">
            <div className="px-0 text-center lg:px-8 lg:text-right xl:px-[60px]">
              <h3 className="mb-3 font-heading text-[26px] leading-tight sm:text-[30px]">
                {bride.name}
              </h3>
              <p className="mb-2.5 text-text">{bride.bio}</p>
              <SocialLinks className="justify-center pt-2.5 lg:justify-end lg:pt-[15px]" />
            </div>
          </Reveal>

          <div className="my-12 shrink-0 lg:my-0">
            <div className="mx-auto flex size-[290px] items-center justify-center overflow-hidden rounded-full bg-white p-5 shadow-card sm:size-[360px] lg:size-[460px]">
              <div className="size-full overflow-hidden rounded-full">
                <img
                  src="/images/couple/1.jpg"
                  alt={`${bride.name} & ${groom.name}`}
                  className="size-full animate-kenburn rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <Reveal direction="right" className="w-full lg:w-[29%]">
            <div className="px-0 text-center lg:px-8 lg:text-left xl:px-[60px]">
              <h3 className="mb-3 font-heading text-[26px] leading-tight sm:text-[30px]">
                {groom.name}
              </h3>
              <p className="mb-2.5 text-text">{groom.bio}</p>
              <SocialLinks className="justify-center pt-2.5 lg:justify-start lg:pt-[15px]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
