interface SectionTitleProps {
  children: string;
  /** Uses the leafy sprig and white type used over the events photo. */
  light?: boolean;
}

export default function SectionTitle({
  children,
  light = false,
}: SectionTitleProps) {
  return (
    <div className="mb-10 w-full text-center md:mb-[60px]">
      {/* Two hairlines under the heading, as in .wpo-section-title h2 */}
      <h2
        className={`relative mt-2.5 inline-block pb-5 font-heading text-[22px] leading-tight sm:text-[32px] sm:leading-10 md:text-[45px] md:leading-[55px] ${
          light ? "text-white" : "text-primary"
        } before:absolute before:bottom-[-10px] before:left-1/2 before:h-px before:w-[70%] before:-translate-x-1/2 before:bg-line before:content-[''] after:absolute after:bottom-0 after:-left-[10%] after:h-px after:w-[120%] after:bg-line after:content-['']`}
      >
        {children}
      </h2>
    </div>
  );
}
