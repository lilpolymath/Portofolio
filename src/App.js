import React, { useState, useCallback, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

import Container from './common/Container';
import Main from './pages/Main';
import Navbar from './components/Navbar';
import Menubar from './components/Menubar';
import useEventListener from './hooks/use-event-listener';
import 'highlight.js/styles/night-owl.css';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const toggleMenubar = () => {
    setOpenMenu(!openMenu);
  };

  const props = useSpring({
    transform: hovered
      ? `translateY(${coords.y - 15}px) translateX(${
          coords.x - 15
        }px) scale(2.5)`
      : `translateY(${coords.y - 15}px) translateX(${
          coords.x - 15
        }px) scale(1)`,
  });

  const handler = useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  useEventListener('mousemove', handler);

  useEffect(() => {
    console.log(document.querySelectorAll('a').childNodes);

    document.querySelectorAll('a').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        setHovered(true);
      });
      item.addEventListener('mouseleave', () => {
        setHovered(false);
      });
    });

    return () => {
      document.querySelectorAll('a').forEach((item) => {
        item.removeEventListener('mouseenter', () => {
          setHovered(true);
        });
        item.removeEventListener('mouseleave', () => {
          setHovered(false);
        });
      });
    };
  }, []);

  return (
    <BrowserRouter>
      <Container>
        <Navbar
          mouseEnter={onMouseEnter}
          mouseLeave={onMouseLeave}
          toggleMenubar={toggleMenubar}
        />
        <Main mouseEnter={onMouseEnter} mouseLeave={onMouseLeave} />
        <Menubar
          mouseEnter={onMouseEnter}
          mouseLeave={onMouseLeave}
          open={openMenu}
          toggleMenubar={toggleMenubar}
        />
        <div
          className='wrap'
          style={{
            opacity: openMenu ? 0.4 : 0,
            display: openMenu ? 'block' : 'none',
          }}
        ></div>
      </Container>
      <animated.div
        style={props}
        className={hovered ? 'cursor active' : 'cursor'}
      ></animated.div>
    </BrowserRouter>
  );
};

export default App;
