import { useApp } from '@/hooks';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import './style.css';

export function DayPicker() {
  const { app } = useApp();
  const [base, setBase] = useState(new Date('2025-07-19T00:00:00'));
  const [active, setActive] = useState(new Date(base));
  const scrollRef = useRef<HTMLDivElement>(null);
  const length = 99;
  const days = useMemo(
    () => Array.from({ length }, (_, i) => new Date(+base + 864e5 * (i - Math.floor(length / 2)))),
    [base]
  );

  useLayoutEffect(() => {
    if (!scrollRef.current || length < 4) return;
    const scroll = scrollRef.current;
    const gap = parseFloat(getComputedStyle(scroll).gap) | 0;
    const step = (scroll.firstChild as HTMLElement)?.offsetWidth + gap;
    scroll.scrollLeft = (Math.floor(length / 2) - 3) * step;

    const sync = () => setActive(days[(Math.round(scroll.scrollLeft / step) | 0) + 3]);
    sync();
    scroll.onscroll = sync;
    scroll.onscrollend = () => {
      const idx = Math.round(scroll.scrollLeft / step) + 3;
      const nearStart = scroll.scrollLeft <= step * 15;
      const nearEnd = scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth - step * 15;
      console.log('nearStart: ', nearStart, 'nearEnd: ', nearEnd);
      if (nearStart || nearEnd) setBase(days[idx]);
      sync();
    };
  }, [days]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [y, m] = e.target.value.split('-');
    setBase(new Date(active.setFullYear(+y, +m - 1)));
  };

  return (
    <>
      <div className="day-picker" ref={scrollRef}>
        {days.map((date, i) => {
          const cls = `day${date.toDateString() === active.toDateString() ? ' active' : ''}`;
          return (
            <button key={i} className={cls} onClick={() => setBase(days[i])}>
              {String(date.getDate()).padStart(2, '0')}
            </button>
          );
        })}
      </div>
      <div className="month-picker">
        <input type="month" name="month" value={active.toJSON().slice(0, 7)} onChange={handleChange} />
      </div>
    </>
  );
}
