import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/components/NavBar';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function Home() {
	const [clientWindowHeight, setClientWindowHeight] = useState(0);
	const { data: user } = useCurrentUser();

	function getMultipleOfTen(num: number): number {
		const multipleOfTen = Math.floor(num / 10) * 10;
		return Math.max(0, Math.min(100, multipleOfTen));
	}

	useEffect(() => {
		const handleScroll = () => {
			const newValue: number = getMultipleOfTen(window.scrollY);
			setClientWindowHeight(newValue);
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<Navbar transparencyHeight={clientWindowHeight} />
		</>
	);
}
