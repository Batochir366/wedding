import { useState } from "react";
import { sectionTitles, storyItems } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Story() {
  const [active, setActive] = useState(0);
  const item = storyItems[active];

  return (
    <section
      id="story"
      className="section-padding relative z-10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle>{sectionTitles.story}</SectionTitle>

        <div className="mb-10 flex flex-wrap justify-center">
          {storyItems.map((story, index) => (
            <button
              key={story.title}
              type="button"
              onClick={() => setActive(index)}
              className={`cursor-pointer px-4 py-2.5 text-[17px] transition-colors duration-300 sm:px-[30px] sm:text-[22px] ${
                index === active
                  ? "text-primary"
                  : "text-text hover:text-primary"
              }`}
            >
              {story.title}
            </button>
          ))}
        </div>

        <div className="flex flex-col shadow-card lg:flex-row lg:items-center">
          <div className="inset-rule relative overflow-hidden lg:basis-1/2">
            <img
              src={item.image}
              alt={item.title}
              className="h-full max-h-[280px] w-full animate-kenburn object-cover lg:max-h-[415px]"
            />
          </div>

          <div className="px-5 pt-10 pb-8 sm:px-10 lg:basis-1/2 lg:px-[50px] lg:py-[45px]">
            <div className="relative border-t border-r border-[#d9dfd0] pt-8 pr-8 pb-2 sm:pr-[60px] lg:pt-[50px]">
              <img
                src={`/images/story/${active + 1}.png`}
                alt=""
                className="mb-2 inline-block"
              />
              <h2 className="mt-6 mb-2.5 font-heading text-2xl leading-tight sm:text-[35px]">
                {item.title}
              </h2>
              <span className="mb-5 block text-[17px] text-primary">
                {item.date}
              </span>
              <p className="text-muted">{item.text}</p>

              <img
                src="/images/story/shape.jpg"
                alt=""
                className="pointer-events-none absolute -top-[30px] -right-[30px] hidden lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
