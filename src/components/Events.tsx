import { sectionTitles, ui, venue } from "../data/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Events() {
  return (
    <section
      id="event"
      className="relative z-10 scroll-mt-24 overflow-x-clip pt-20 pb-[70px] md:scroll-mt-28 md:pt-[90px] lg:pt-[120px]"
    >
      {/* Photo band behind the section title */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[280px] bg-cover bg-center sm:h-[360px] lg:h-[500px]"
        style={{ backgroundImage: "url(/images/event/bg.jpg)" }}
      >
        <span className="absolute inset-0 bg-[rgba(94,86,86,0.6)]" />
      </div>

      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle light>{sectionTitles.events}</SectionTitle>

        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="bg-white p-4 shadow-card sm:p-5 lg:p-[30px]">
              <div className="overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="aspect-[16/10] w-full object-cover sm:aspect-auto"
                />
              </div>
              <div className="px-1 pt-6 pb-2 text-center sm:px-0 sm:pt-10 sm:pb-4 lg:px-[20px]">
                <h2 className="mb-4 font-heading text-xl uppercase text-primary sm:mb-[25px] lg:text-[25px]">
                  {venue.name}
                </h2>
                <ul className="space-y-3 text-[15px] leading-7 text-body sm:space-y-[15px] sm:text-[17px] sm:leading-[30px]">
                  <li>{venue.date}</li>
                  <li className="break-words">{venue.place}</li>
                  <li>
                    <a
                      href={venue.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block border-b border-primary font-medium text-primary sm:mt-2.5"
                    >
                      {ui.seeLocation}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-white p-5 shadow-card sm:p-8 lg:p-[30px]">
              <h2 className="mb-6 text-center font-heading text-xl uppercase text-primary sm:mb-8 lg:text-[25px]">
                ХӨТӨЛБӨР
              </h2>
              <ol className="relative ml-2 space-y-0 border-l border-primary/30 sm:ml-4">
                {venue.schedule.map((item) => (
                  <li
                    key={item.time}
                    className="relative pb-5 pl-5 last:pb-0 sm:pb-6 sm:pl-8"
                  >
                    <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-primary" />
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <time className="w-[3.25rem] shrink-0 font-heading text-base text-primary sm:w-auto sm:text-lg">
                        {item.time}
                      </time>
                      <span className="min-w-0 text-[15px] leading-6 text-body sm:text-[17px] sm:leading-[28px]">
                        {item.title}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
