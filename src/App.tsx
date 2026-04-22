import { BrowserRouter } from "react-router-dom";
import herobg from "./assets/herobg.png";

import {
  About,
  Contact,
  CurrentlyBuilding,
  Experience,
  Footer,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "./components";
import { LazyCanvas } from "./components/canvas";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div
          className='bg-cover bg-no-repeat bg-center'
          style={{ backgroundImage: `url(${herobg})` }}
        >
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <CurrentlyBuilding />
        <div className='relative z-0'>
          <Contact />
          {/* StarsCanvas positions itself via its own absolute wrapper. We use
              LazyCanvas only to defer mounting until the Contact section is near. */}
          <LazyCanvas className='pointer-events-none' rootMargin='400px 0px'>
            <StarsCanvas />
          </LazyCanvas>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
