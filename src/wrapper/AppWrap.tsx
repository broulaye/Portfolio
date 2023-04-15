import React from 'react';
import { NavigationDots, SocialMedia } from '../components';

type ComponentProps = {};

type Props = {
  Component: (props: ComponentProps) => JSX.Element;
  idName: string;
  classNames?: string;
}

const AppWrap = ({ Component, idName, classNames }: Props) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classNames}`}>
      <SocialMedia />
      <div className="app__wrapper app__flex">
        <Component />
      </div>
      <NavigationDots active={idName} />
    </div>
  );
};

export default AppWrap;