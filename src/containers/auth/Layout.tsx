import Image from 'next/image';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <section className='outer'>
      <div className='inner flex h-screen flex-col'>
        <section className='grid flex-grow grid-cols-12 gap-8'>
          {/* 圖片 */}
          <header className='col-span-6 flex flex-col justify-center gap-12 pl-12'>
            <div className='flex items-center gap-4'>
              <Image src='/images/logo-rounded.svg' alt='logo' priority width={82} height={82} />
              <Image
                src='/images/logo-text.svg'
                alt='logo-text'
                priority
                width={297}
                height={62}
                className='h-auto w-auto'
              />
            </div>
            <Image
              src='/images/banner-home.png'
              alt='home-banner'
              priority
              width={563}
              height={70}
              className='h-auto w-auto'
            />
          </header>
          {/* 表單 */}
          <div className='col-span-5 col-start-8 flex flex-col justify-center pr-12'>
            <section className='flex flex-col justify-center gap-8 rounded-[30px] border border-stroke p-8'>
              {children}
            </section>
          </div>
        </section>
      </div>
      <Footer />
    </section>
  );
}

export default Layout;
