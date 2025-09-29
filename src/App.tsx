import { useEffect, useRef, useState } from 'react';
import BubbleMenu from './components/BubbleMenu';
import InfiniteMenu from './components/InfiniteMenu';
import logoMark from '../logo1.svg';
import introLogo from '../logo2.svg';

const infiniteMenuItems = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

const bubbleMenuItems = [
  {
    label: 'home',
    href: '#home',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#6366f1', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#about',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '#projects',
    ariaLabel: 'Projects',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#111111' }
  },
  {
    label: 'blog',
    href: '#blog',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#contact',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isIntroFading, setIsIntroFading] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsIntroFading(true);
      fadeTimeoutRef.current = window.setTimeout(() => {
        setIsIntroActive(false);
      }, 700);
    }, 1200);

    return () => {
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {isIntroActive && (
        <div
          className={`intro-overlay ${isIntroFading ? 'intro-overlay--hide' : ''}`}
          aria-hidden={!isIntroActive}
        >
          <img className="intro-logo" src={introLogo} alt="Loop Intelligence" />
        </div>
      )}

      <main className={`app-shell ${isIntroActive ? 'app-shell--masked' : ''}`}>
        <BubbleMenu
          logo={logoMark}
          items={bubbleMenuItems}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
        <section className="menu-stage" id="home">
          <InfiniteMenu items={infiniteMenuItems} />
        </section>
      </main>
    </>
  );
}

export default App;
