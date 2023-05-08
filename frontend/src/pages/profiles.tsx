import { NextPageContext } from "next";
import { useRouter } from 'next/router';
import useCurrentUser from "@/hooks/useCurrentUser";
import { getSession } from "next-auth/react";
import Image from 'next/image';
import profileDefaultImage from 'public/assets/default-red.png';

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

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-5xl text-white text-center">
          Quem está assistindo?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push('/browse')}>
            <div className="group flex-row w-36 md:w-44 mx-auto">
              <div
                className="
                  w-36
                  h-36
                  md:w-44
                  md:h-44
                  rounded-md
                  flex
                  items-center
                  justify-center
                  border-2
                  border-transparent
                  group-hover:cursor-pointer
                  group-hover:border-white
                  overflow-hidden
                  transition
                "
              >
                <Image src={profileDefaultImage} alt="Profile" />
              </div>
              <div className='mt-4 text-gray-400 text-1xl text-center group-hover:text-white cursor-pointer'>
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profiles;