import Footer from '@/components/Footer';
import Overview from '@/containers/Overview';

function OverviewPage() {
  return (
    <section className='w-full pt-16'>
      <section className='outter'>
        <div className='inner flex flex-col gap-y-[72px]'>
          <Overview />
          <Footer />
        </div>
      </section>
    </section>
  );
}

export default OverviewPage;
