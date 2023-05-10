import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/NavBar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';

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
	const {data: movies = [] } = useMovieList();

	return (
		<>
			<Navbar />
			<Billboard />
			<div className='pb-40'>
				<MovieList title='Em Alta' data={movies} />
			</div>
		</>
	);
}
