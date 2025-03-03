import { Layout } from '@/components';
import { Touch } from '@/components/Widgets';
import { useApp, useGesture } from '@/hooks';

export function Journal() {
  const { view, isAnimating } = useApp().app;
  const { data, gesture } = useGesture();

  return (
    <>
      <Layout title="JOURNAL" className={`${view}${isAnimating ? ' animating' : ''}`} {...gesture}>
        <Touch data={data} />
      </Layout>
    </>
  );
}
