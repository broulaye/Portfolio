import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/broulaye",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/broulaye/",
    icon: FiLinkedin,
  },
  {
    name: "Email",
    href: "mailto:broulayepro@gmail.com",
    icon: FiMail,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='relative z-10 border-t border-white/10 bg-primary/60 backdrop-blur'>
      <div className='max-w-7xl mx-auto sm:px-16 px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
        <div>
          <p className='text-white font-semibold text-[15px]'>Broulaye</p>
          <p className='text-secondary text-[13px] mt-1'>
            Frontend Software Engineer &middot; Open to remote roles
          </p>
        </div>

        <div className='flex items-center gap-4'>
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
              aria-label={name}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]'
            >
              <Icon className='h-4 w-4' aria-hidden='true' />
            </a>
          ))}
        </div>

        <p className='text-secondary text-[12px]'>
          &copy; {year} Broulaye. Built with React &amp; Three.js.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
