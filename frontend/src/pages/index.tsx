import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (session) {
		return {
			props: {},
			redirect: {
				destination: '/browse',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function Home() {
	return (
		<>
			<h1 className='text-4xl text-green-500'>NEXTFLIX</h1>
			<Link href='/login'>
				<button className='h-10 w-full bg-white'>LOGIN</button>
			</Link>
		</>
	);
}
