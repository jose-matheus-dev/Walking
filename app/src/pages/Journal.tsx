import { Layout } from '@/components';
import { useApp } from '@/hooks';

export function Journal() {
  const { view, isAnimating } = useApp().app;

  return (
    <>
      <Layout className={`${view}${isAnimating ? ' animating' : ''}`} title="JOURNAL"></Layout>
    </>
  );
}
