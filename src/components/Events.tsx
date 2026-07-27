import { events, sectionTitles, ui } from "../data/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Events() {
  return (
    <section
      id="event"
      className="relative z-10 pt-20 pb-[70px] md:pt-[90px] lg:pt-[120px]"
    >
      {/* Photo band behind the section title */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-cover bg-center lg:h-[500px]"
        style={{ backgroundImage: "url(/images/event/bg.jpg)" }}
      >
        <span className="absolute inset-0 bg-[rgba(94,86,86,0.6)]" />
      </div>

      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle light>{sectionTitles.events}</SectionTitle>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <Reveal key={event.title} delay={index * 120}>
              <div className="mb-10 bg-white p-4 shadow-card lg:p-[30px]">
                <div className="overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full" />
                </div>
                <div className="px-0 pt-10 pb-4 text-center lg:px-[35px]">
                  <h2 className="mb-[25px] font-heading text-xl uppercase text-primary lg:text-[25px]">
                    {event.title}
                  </h2>
                  <ul className="space-y-[15px] text-[17px] leading-[30px] text-body">
                    <li>
                      {event.when[0]}
                      <br />
                      {event.when[1]}
                    </li>
                    <li>{event.place}</li>
                    <li>{event.phone}</li>
                    <li>
                      <a
                        href={event.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2.5 inline-block border-b border-primary font-medium text-primary"
                      >
                        {ui.seeLocation}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
