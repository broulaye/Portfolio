import { BallCanvas, LazyCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import useIsMobile from "../utils/useIsMobile";

/**
 * On mobile (and for users who prefer reduced motion), we skip the 13 WebGL
 * canvases and render a static logo grid — huge perf win on low-end devices.
 */
const Tech = () => {
  const isMobile = useIsMobile(640);

  if (isMobile) {
    return (
      <div className='flex flex-row flex-wrap justify-center gap-6 sm:gap-10'>
        {technologies.map((technology) => (
          <div
            key={technology.name}
            className='flex flex-col items-center gap-2 w-24'
          >
            <div className='w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-4'>
              <img
                src={technology.icon}
                alt={`${technology.name} logo`}
                className='w-full h-full object-contain'
                loading='lazy'
                decoding='async'
              />
            </div>
            <span className='text-secondary text-[11px] text-center'>{technology.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <LazyCanvas
            className='w-full h-full'
            fallback={
              <img
                src={technology.icon}
                alt={`${technology.name} logo`}
                className='w-full h-full object-contain opacity-70'
                loading='lazy'
                decoding='async'
              />
            }
          >
            <BallCanvas icon={technology.icon} />
          </LazyCanvas>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
