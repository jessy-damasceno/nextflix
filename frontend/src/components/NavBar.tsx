import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GoChevronDown } from 'react-icons/go';
import { BsSearch, BsBell } from 'react-icons/bs';

import logo from 'public/assets/logo.png';
import avatar from 'public/assets/default-red.png';

import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

interface Props {
  transparencyHeight?: number;
}

const Navbar: FC<Props> = ({ transparencyHeight }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const navRef: any = useRef();
  const accountMenuRef: any = useRef();

  useEffect(() => {
    const handler = (e: any) => {
      if (navRef.current?.contains(e.target)) {
        setShowAccountMenu(false);
      } else if (accountMenuRef.current?.contains(e.target)) {
        setShowMobileMenu(false);
      } else {
        setShowMobileMenu(false);
        setShowAccountMenu(false);
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

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev)
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
          <GoChevronDown className={`text-white transition ${showMobileMenu && 'rotate-180'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsBell />
          </div>

          <div onClick={toggleAccountMenu} ref={accountMenuRef} className='flex flex-row items-center gap-2 cursor-pointer relative'>
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image src={avatar} alt='Avatar' />
            </div>
            <GoChevronDown className={`text-white transition ${showAccountMenu && 'rotate-180'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
			</div>
		</nav>
	);
};

export default Navbar;
