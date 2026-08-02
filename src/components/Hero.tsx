import { wedding } from "../data/site";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-x-clip bg-white pt-32 pb-24 md:scroll-mt-28 lg:flex lg:min-h-[900px] lg:items-center lg:py-0 xl:min-h-[1000px]"
    >
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 items-center gap-14 px-4 lg:grid-cols-[1fr_500px] lg:gap-10 lg:px-[70px] xl:px-[120px] 2xl:px-[200px]">
        <div className="min-w-0 text-center lg:pl-10 lg:text-left xl:pl-[100px]">
          <img
            src="/images/slider/shape.png"
            alt=""
            className="mx-auto mb-6 w-[120px] lg:mx-0 lg:mb-[60px] lg:w-auto"
          />

          <h2 className="mb-2.5 font-heading text-[30px] leading-tight text-primary text-[50px] lg:text-[60px] xl:text-[80px]">
            {wedding.groom} <br />
            &amp; {wedding.bride}
          </h2>

          <p className="text-base uppercase text-text lg:text-lg">
            {wedding.tagline}
          </p>

          <Countdown date={wedding.countdownTo} />

          <img
            src="/images/slider/shape2.png"
            alt=""
            className="mx-auto mt-8 w-[120px] lg:mx-0 lg:mt-20 lg:w-auto"
          />
        </div>

        {/* Oval portrait with the two botanical shapes behind it */}
        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:mx-0 lg:max-w-[500px] lg:justify-self-end">
          <div className="relative z-10 rounded-[320px] bg-white p-4 shadow-card lg:p-[30px]">
            <div className="overflow-hidden rounded-[300px]">
              <img
                src="/images/slider/s1.jpg"
                alt={`${wedding.groom} болон ${wedding.bride}`}
                className="aspect-[4/5] w-full animate-kenburn object-cover object-[center_15%]"
              />
            </div>
          </div>

          <img
            src="/images/slider/shape3.png"
            alt=""
            className="pointer-events-none absolute -bottom-[80px] -left-[40px] z-0 w-[180px] lg:-bottom-[140px] lg:-left-[70px] lg:w-[280px] xl:w-[330px]"
          />
          <img
            src="/images/slider/shape4.png"
            alt=""
            className="pointer-events-none absolute -top-[30px] -right-[40px] z-0 w-[150px] lg:-top-[40px] lg:-right-[90px] lg:w-[200px] xl:-right-[150px] xl:w-[250px]"
          />
        </div>
      </div>
    </section>
  );
}
