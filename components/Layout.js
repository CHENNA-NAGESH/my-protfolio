import { useEffect } from 'react'
import ThreeD from './layout/ThreeD'
import Footer from './layout/Footer'
import Nav from './layout/Nav'
import BackToTop from './layout/BackToTop'

export default function Layout({ children }) {
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }, []);

    return (
        <>
            <Nav />
            <div className='min-h-screen w-full'>
                <ThreeD />
                <main className='absolute w-full bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors duration-300'>
                    {children}
                    <Footer />
                </main>
                <BackToTop />
            </div>
        </>
    )
}
