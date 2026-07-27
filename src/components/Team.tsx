import { sectionTitles, team } from '../data/site'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

export default function Team() {
  return (
    <section className="overflow-hidden pb-12 sm:pb-[70px] lg:pb-5">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle>{sectionTitles.team}</SectionTitle>

        <div className="grid grid-cols-1 gap-x-[60px] sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={(index % 3) * 120}>
              <div className="group mb-[50px] text-center lg:mb-[100px]">
                <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                  <div className="relative z-10 rounded-full bg-white p-5 shadow-card">
                    <img src={member.image} alt={member.name} className="w-full rounded-full" />
                  </div>
                  <img
                    src="/images/team/shape1.jpg"
                    alt=""
                    className="pointer-events-none absolute -top-[60px] -left-[60px] z-0 transition-all duration-300 group-hover:-top-20 group-hover:-left-20"
                  />
                  <img
                    src="/images/team/shape2.jpg"
                    alt=""
                    className="pointer-events-none absolute -right-[60px] -bottom-[60px] z-0 transition-all duration-300 group-hover:-right-20 group-hover:-bottom-20"
                  />
                </div>

                <div className="pt-5">
                  <h3 className="text-[30px] leading-[55px] lg:text-[35px]">
                    <a href="#" className="text-ink transition-colors hover:text-primary">
                      {member.name}
                    </a>
                  </h3>
                  <span className="text-base text-primary">{member.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
