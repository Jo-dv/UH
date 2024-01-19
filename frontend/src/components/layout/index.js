import { Outlet } from 'react-router-dom';
import Header from './Header.js';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <MainBox /> */}
    </>
  );
};

const MainBox = () => {
  return(
    <div className="bg-neutral-300 mx-auto p-4 border border-neutral-300 rounded flex items-center justify-center
    w:w-[1820px] w:h-[950px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1820px]
    h-[300px] md:h-[600px] lg:h-[750px] xl:h-[850px] 2xl:h-[950px]">
    </div>
  )
}

export default Layout;