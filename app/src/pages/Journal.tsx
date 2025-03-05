import { Layout } from '@/components';
import { DayPicker, Touch } from '@/components/widgets';
import { useApp, useGesture } from '@/hooks';

export function Journal() {
  const { view, isAnimating } = useApp().app;
  const { data, gesture } = useGesture();

  return (
    <>
      <Layout title="JOURNAL" className={`${view}${isAnimating ? ' animating' : ''}`}>
        <DayPicker />
        <section className="touch-area" {...gesture}>
          <Touch data={data} />
        </section>
      </Layout>
    </>
  );
}
