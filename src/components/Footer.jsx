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
    <footer className='relative z-10 border-t border-white/10'>
      <div className='max-w-7xl mx-auto sm:px-16 px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5'>
        <div>
          <p className='text-white font-mono text-[13px]'>broulaye.dev</p>
          <p className='text-muted text-[12px] mt-1 font-mono'>
            Frontend engineer · Open to remote
          </p>
        </div>

        <div className='flex items-center gap-2'>
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
              aria-label={name}
              className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-colors'
            >
              <Icon className='h-4 w-4' aria-hidden='true' />
            </a>
          ))}
        </div>

        <p className='text-muted text-[12px] font-mono'>
          &copy; {year} Broulaye
        </p>
      </div>
    </footer>
  );
};

export default Footer;
