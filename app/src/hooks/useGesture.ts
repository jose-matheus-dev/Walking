import { useCallback, useRef, useState } from 'react';

export function useGesture() {
  const [data, setData] = useState({ x: 0, y: 0, dx: 0, dy: 0, dt: 0, dir: '' });
  const startRef = useRef({ id: 0, startX: 0, startY: 0, ts: 0 });

  const onTouchStart = useCallback(({ touches, timeStamp: ts }: React.TouchEvent) => {
    const { identifier, clientX, clientY } = touches[0];
    startRef.current = { id: identifier, startX: clientX | 0, startY: clientY | 0, ts };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    let { id, startX, startY, ts } = startRef.current;
    const t = e.changedTouches[0];
    if (t.identifier !== id) return;

    const offset = 5 * (Math.min(window.innerWidth, window.innerHeight) / 100);
    const { offsetTop, offsetWidth, offsetHeight } = e.currentTarget as HTMLElement;
    startX = Math.min(Math.max(startX | 0, offset), offsetWidth - offset);
    const endX = Math.min(Math.max(t.clientX | 0, offset), offsetWidth - offset);
    const endY = Math.min(Math.max(t.clientY | 0, offsetTop), offsetTop + offsetHeight);

    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);
    const dt = Math.min((e.timeStamp - ts) | 0, 1000);
    const dir = dx < dy ? (endY < startY ? 'up' : 'down') : endX < startX ? 'left' : 'right';

    setData({ x: startX, y: startY, dx, dy, dt, dir });
  }, []);

  return { data, gesture: { onTouchStart, onTouchEnd } };
}
