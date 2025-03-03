import { useGesture } from '@/hooks';
import { useEffect, useRef } from 'react';
import './style.css';

export function Touch({ data }: { data: ReturnType<typeof useGesture>['data'] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { x, y, dx, dy, dt, dir } = data;
    const touch = ref.current;
    if (!touch || touch.classList.contains('shown') || (dy < 54 && dx < 54)) return;

    touch.style.setProperty('--x', `calc(${x}px - 5vmin)`);
    touch.style.setProperty('--y', `calc(${y}px - 5vmin)`);
    touch.style.setProperty('--dx', `calc(${dx}px + 10vmin)`);
    touch.style.setProperty('--dy', `calc(${dy}px + 10vmin)`);
    touch.style.setProperty('--dt', `${dt}ms`);
    touch.style.setProperty('--rot', `${{ left: 180, right: 0, up: -90, down: 90 }[dir]}deg`);

    requestAnimationFrame(() => {
      touch.classList.add('shown');
      touch.onanimationend = () => {
        touch.classList.remove('shown');
        touch.onanimationend = null;
      };
    });
  }, [data]);

  return <div className="touch" ref={ref}></div>;
}
