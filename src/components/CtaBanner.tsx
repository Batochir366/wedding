import { ui } from '../data/site'

export default function CtaBanner() {
  return (
    <section
      className="relative z-10 bg-cover bg-center py-[90px] lg:py-[145px]"
      style={{ backgroundImage: 'url(/images/cta2.jpg)' }}
    >
      <span className="absolute inset-0 -z-10 bg-black/35" />
      <div className="px-4 text-center">
        <h2 className="mx-auto mt-2.5 mb-5 max-w-4xl text-[30px] text-white sm:text-[40px] md:text-[60px] lg:text-[70px] lg:leading-tight">
          {ui.cta.title}
        </h2>
        <a href="#rsvp" className="btn-outline">
          {ui.cta.button}
        </a>
      </div>
    </section>
  )
}
