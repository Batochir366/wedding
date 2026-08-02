import { useEffect, useState } from "react";
import { navLinks, ui } from "../data/site";
import { CloseIcon, MenuIcon, UserIcon } from "./Icons";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_20px_rgba(0,38,66,0.08)]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-4 lg:px-10 py-2">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={ui.openMenu}
          className="bg-primary p-2 text-2xl text-white lg:hidden"
        >
          <MenuIcon />
        </button>

        <Logo className="text-[35px] md:text-[40px] lg:text-[45px]" />

        <nav className="hidden lg:block">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block px-[18px] text-[15px] font-medium uppercase text-ink transition-colors duration-300 hover:text-primary ${
                    scrolled ? "py-6" : "py-8"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#rsvp"
          className="btn-primary !px-4 !py-2.5 uppercase md:!px-6"
        >
          <span className="hidden md:inline">{ui.attend}</span>
          <UserIcon className="text-xl md:hidden" />
        </a>
      </div>

      {/* Mobile drawer */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed inset-y-0 left-0 w-[280px] overflow-y-auto bg-white px-7 py-8 transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label={ui.closeMenu}
          className="mb-8 text-2xl text-ink"
        >
          <CloseIcon />
        </button>
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  setMenuOpen(false);
                  const id = link.href.replace("#", "");
                  // Wait for the drawer to unlock body overflow, then scroll.
                  window.setTimeout(() => {
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", link.href);
                  }, 50);
                }}
                className="block border-b border-line py-3 text-base font-medium uppercase text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
