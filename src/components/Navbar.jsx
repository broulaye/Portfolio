import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsDownload } from 'react-icons/bs';

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='Broulaye logo' className='w-12 h-12 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Broulaye &nbsp;
            <span className='sm:block hidden'> | Frontend Software Engineer</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => {
            if(nav.id === 'download') {
              return (
                <a
                  key={nav.id}
                  href="/pdf/Resume.pdf"
                  download=""
                  aria-label="Download resume"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded"
                >
                  <BsDownload
                    className={`text-secondary hover:text-white text-[18px] font-medium cursor-pointer w-10 h-6`}
                  />
                </a>

              );
            }
            return (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a
                  href={`#${nav.id}`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded px-1"
                >
                  {nav.title}
                </a>
              </li>
            )
          })}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            onClick={() => setToggle(!toggle)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded"
          >
            <img
              src={toggle ? close : menu}
              alt=''
              aria-hidden="true"
              className='w-[28px] h-[28px] object-contain'
            />
          </button>

          <div
            id="mobile-menu"
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => {
                if (nav.id === 'download') {
                  return (
                    <li key={nav.id} className="font-poppins font-medium text-[16px] text-secondary hover:text-white">
                      <a
                        href="/pdf/Resume.pdf"
                        download=""
                        onClick={() => setToggle(false)}
                      >
                        {nav.title}
                      </a>
                    </li>
                  );
                }
                return (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.title ? "text-white" : "text-secondary"
                    }`}
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