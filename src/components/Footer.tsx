import { footer, ui } from "../data/site";
import { MapPinIcon, PhoneIcon } from "./Icons";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

function WidgetTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-5 font-heading text-xl text-ink md:mb-[30px] md:text-[25px]">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cream text-[15px]">
      <div className="px-4 pt-12 pb-4 md:px-[50px] md:py-20 lg:px-[120px] lg:py-[100px]">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <div className="xl:pr-10">
            <Logo className="mb-5 text-[40px] md:mb-[30px] md:text-[45px]" />
            <p className="mb-3 leading-[1.9em] text-[#525252]">
              {footer.about}
            </p>
            <SocialLinks variant="solid" className="pt-2.5" />
          </div>

          <div>
            <WidgetTitle>{ui.footerHeadings.contact}</WidgetTitle>
            <ul className="space-y-[15px] text-primary">
              <li className="flex items-start gap-3">
                <PhoneIcon className="mt-1 shrink-0" />
                <a>{footer.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-1 shrink-0" />
                <span>{footer.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
