import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import logo from 'public/assets/logo.png';
import NavbarItem from './NavbarItem';

import { GoChevronDown } from 'react-icons/go';
import MobileMenu from './MobileMenu';

interface Props {
  transparencyHeight?: number;
}

const Navbar: FC<Props> = ({ transparencyHeight }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navRef: any = useRef();

  useEffect(() => {
    const handler = (e: any) => {
      if (!navRef.current?.contains(e.target)) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener('mousedown', handler);
  
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  }, [])
  

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev)
  }, [])

	return (
		<nav className='w-full fixed z-50'>
			<div className={`px-2 md:px-12 py-4 flex flex-row items-center transition bg-zinc-900 bg-opacity-${transparencyHeight}`}>
				<Image className='w-24 lg:w-28' src={logo} alt='Nextflix logo' />
        <div className='flex-row ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Início' />
          <NavbarItem label='Séries' />
          <NavbarItem label='Filmes' />
          <NavbarItem label='Bombando' />
          <NavbarItem label='Minha lista' />
          <NavbarItem label='Navegar por idiomas' />
        </div>
        <div ref={navRef} onClick={toggleMobileMenu} className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
          <p className='text-white text-sm'>Navegar</p>
          <GoChevronDown className='text-white transition' />
          <MobileMenu visible={showMobileMenu} />
        </div>
			</div>
		</nav>
	);
};

export default Navbar;
