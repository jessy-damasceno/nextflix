import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/Input';
import Image from 'next/image';
import logo from '../assets/logo.png';
import InputPassword from '@/components/InputPassword';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { validateEmail } from '@/utils/isValidEmail';
import { signIn } from 'next-auth/react';
import ErrorBox from '@/components/ErrorBox';
import Loading from '@/components/Loading';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

interface ERRORS {
	bold?: string;
	text: string;
	linkText: string;
	href: string;
}

const LOG_ERRORS = {
	'User not found': {
		text: 'Desculpe, não encontramos uma conta com esse endereço de email. Tente novamente ou',
		linkText: 'crie uma nova conta',
		href: '/',
	},
	'Invalid password': {
		bold: 'Senha incorreta.',
		text: 'Tente novamente ou',
		linkText: 'redefina sua senha',
		href: '/loginHelp',
	},
};

const AuthPage = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [password, setPassword] = useState('');
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [rememberMe, setRememberMe] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<ERRORS | null>(null);

	useEffect(() => {
		const checkSavedUser = () => {
			const data = localStorage.getItem('nextflix_login');

			if (data) {
				const { email, password } = JSON.parse(data);
				setEmail(email);
				setPassword(password);
			}
		};

		checkSavedUser();
	}, []);

	const mailChange = (ev: { target: { value: SetStateAction<string> } }) => {
		const newValue = ev.target.value;
		setEmail(newValue);
		setIsValidEmail(validateEmail(newValue as string));
	};

	const passWordChange = (ev: {
		target: { value: SetStateAction<string> };
	}) => {
		const newValue = ev.target.value;
		setPassword(newValue);

		if (newValue.length < 4 || newValue.length > 60) {
			setIsValidPassword(false);
		} else {
			setIsValidPassword(true);
		}
	};

	const login = useCallback(async () => {
		if (!email && !password) {
			setIsValidEmail(false);
			setIsValidPassword(false);
			return;
		}
		const user = {
			email,
			password,
		};

		if (rememberMe) {
			localStorage.setItem('nextflix_login', JSON.stringify(user));
		} else {
			localStorage.removeItem('nextflix_login');
		}

		try {
			setIsLoading(true);
			const response = await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/',
			});

			if (response?.ok) {
				router.push('/');
			} else {
				setPassword('');
				setIsValidPassword(false);
				setErrorMessage(
					LOG_ERRORS[response?.error as keyof typeof LOG_ERRORS] || null
				);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	}, [email, password, rememberMe, router]);

	return (
		<div className="relative w-full bg-[url('../assets/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className='bg-black w-full h-full md:bg-opacity-50'>
				<nav className='py-4'>
					<Image
						src={logo}
						alt='Logo'
						height={32}
						className='sm:w-48 ml-[3%]'
					/>
				</nav>
				<div className='flex justify-center'>
					<div className='bg-black bg-opacity-70 px-[5%] md:px-16 md:py-16 self-center mt-2 md:w-[450px] rounded-md w-full mb-20'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>Entrar</h2>
						<div className='flex flex-col gap-4 mb-8'>
							{errorMessage && (
								<div>
									<ErrorBox {...errorMessage} />
								</div>
							)}
							<div>
								<Input
									label='Email'
									onChange={mailChange}
									id='email'
									type='email'
									value={email}
									isValid={isValidEmail}
								/>
								{!isValidEmail && (
									<span className='text-amber-600 text-xs'>
										Informe um email válido.
									</span>
								)}
							</div>
							<div>
								<InputPassword
									label='Senha'
									onChange={passWordChange}
									id='password'
									value={password}
									isValid={isValidPassword}
								/>
								{!isValidPassword && (
									<span className='text-amber-600 text-xs'>
										A senha deve ter entre 4 e 60 caracteres.
									</span>
								)}
							</div>
							<div className='relative'>
								<button
									disabled={isLoading}
									onClick={login}
									className='bg-[#e50914] py-3 text-white font-semibold rounded-md w-full mt-4 transition disabled:opacity-30'
								>
									{isLoading ? <Loading /> : 'Entrar'}
								</button>
							</div>
							<div className='flex justify-between w-full items-center'>
								<div className='flex items-center'>
									<input
										id='checkbox'
										type='checkbox'
										className='form-checkbox h-5 w-5 rounded transition duration-150 ease-in-out'
										onChange={() => setRememberMe(!rememberMe)}
									/>
									<label
										htmlFor='checkbox'
										className='ml-2 text-xs text-gray-400'
									>
										Lembre-se de mim
									</label>
								</div>
								<Link className='h-full' href='/LoginHelp'>
									<p className='align-middle text-xs text-gray-400 hover:underline'>
										Precisa de ajuda?
									</p>
								</Link>
							</div>
						</div>
						<div className='flex flex-row items-center gap-4 mt-8 justify-center'>
							<div
								onClick={() => signIn('google', { callbackUrl: '/' })}
								className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
							>
								<FcGoogle size={24} />
							</div>
							<div
								onClick={() => signIn('github', { callbackUrl: '/' })}
								className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
							>
								<FaGithub size={24} />
							</div>
						</div>
						<div className='mt-8 text-gray-500'>
							<div>
								{`Novo por aqui? `}
								<Link href='/register'>
									<span className='text-gray-200'>Assine agora</span>
								</Link>
								.
							</div>
						</div>
						<p className='text-xs text-gray-400 mt-4 font-medium'>
							Esta página é protegida pelo Google reCAPTCHA para garantir que
							você não é um robô.{' '}
							{isVisible && (
								<button
									onClick={() => setIsVisible(false)}
									className='text-blue-600 hover:underline'
								>
									Saiba mais.
								</button>
							)}
						</p>
						<div>
							<p
								className={`text-xs text-gray-400 mt-4 ${
									!isVisible
										? 'transition duration-300 ease-in-out opacity-100'
										: 'invisible opacity-0'
								}`}
							>
								As informações recolhidas pelo Google reCAPTCHA estão sujeitas à{' '}
								<Link
									className='text-blue-500 hover:underline'
									href='https://policies.google.com/privacy'
									id='recaptcha-privacy-link'
									target='_blank'
								>
									Política de Privacidade
								</Link>{' '}
								e{' '}
								<Link
									className='text-blue-500 hover:underline'
									href='https://policies.google.com/terms'
									id='recaptcha-tos-link'
									target='_blank'
								>
									Termos de Uso
								</Link>
								, e são usadas para oferecer, manter e melhorar o serviço
								reCAPTCHA e por questões de segurança (não são usadas para
								exibir anúncios personalizados pelo Google).
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AuthPage;
