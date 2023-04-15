import React from 'react'

import { About, Footer, Header, Skills, Work } from './container';
import { Navbar } from './components';
import './App.scss';

type Props = {}

const App = (props: Props) => {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
    </div>
  )
}

export default App