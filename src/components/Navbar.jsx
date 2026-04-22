import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsDownload } from "react-icons/bs";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-30 transition-colors ${
        scrolled ? "bg-primary/80 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-3 group'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className='w-8 h-8 rounded-md bg-accent flex items-center justify-center font-mono text-[14px] text-primary font-medium group-hover:brightness-110 transition'>
            B
          </span>
          <span className='hidden sm:inline font-mono text-[13px] text-white/80 group-hover:text-white transition-colors'>
            broulaye<span className='text-muted'>.dev</span>
          </span>
        </Link>

        <ul className='list-none hidden sm:flex flex-row items-center gap-7'>
          {navLinks
            .filter((nav) => nav.id !== "download")
            .map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[13px] font-mono transition-colors`}
                onClick={() => setActive(nav.title)}
              >
                <a
                  href={`#${nav.id}`}
                  className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1'
                >
                  {nav.title}
                </a>
              </li>
            ))}
          <a
            href='/pdf/Resume.pdf'
            download=''
            aria-label='Download resume'
            className='inline-flex items-center gap-2 rounded-md border border-white/15 hover:border-white/30 hover:bg-white/5 px-3 py-1.5 text-[13px] font-mono text-white transition-colors'
          >
            <BsDownload className='w-3.5 h-3.5' aria-hidden='true' />
            Resume
          </a>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls='mobile-menu'
            onClick={() => setToggle(!toggle)}
            className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded'
          >
            <img
              src={toggle ? close : menu}
              alt=''
              aria-hidden='true'
              className='w-[24px] h-[24px] object-contain'
            />
          </button>

          <div
            id='mobile-menu'
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-surface border border-white/10 absolute top-16 right-4 min-w-[180px] z-10 rounded-xl`}
          >
            <ul className='list-none flex flex-col gap-4 flex-1'>
              {navLinks.map((nav) => {
                if (nav.id === "download") {
                  return (
                    <li key={nav.id} className='font-mono text-[13px] text-secondary hover:text-white'>
                      <a href='/pdf/Resume.pdf' download='' onClick={() => setToggle(false)}>
                        {nav.title}
                      </a>
                    </li>
                  );
                }
                return (
                  <li
                    key={nav.id}
                    className={`font-mono text-[13px] cursor-pointer ${
                      active === nav.title ? "text-white" : "text-secondary"
                    } hover:text-white`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
