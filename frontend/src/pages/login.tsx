import { SetStateAction, useState } from 'react';
import Input from '@/components/input';
import Image from 'next/image';
import logo from '../assets/logo.png';
import InputPassword from '@/components/inputPassword';
import Link from 'next/link';

const AuthPage = () => {
	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [password, setPassword] = useState('');
	const [isValidPassword, setIsValidPassword] = useState(true);
	// const [rememberMe, setRememberMe] = useState('true'); botão lembre-se de mim, criar funcionalidade
	const [isVisible, setIsVisible] = useState(true);

	const regexEmail = /^\w+(-?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

	const mailChange = (ev: { target: { value: SetStateAction<string> } }) => {
		const newValue = ev.target.value;
		setEmail(ev.target.value);

		if (regexEmail.test(newValue as string)) {
			setIsValidEmail(true);
		} else {
			setIsValidEmail(false);
		}
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
					<div className='bg-black bg-opacity-70 px-[5%] md:px-16 md:py-16 self-center mt-2 md:w-[450px] rounded-md w-full'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>Entrar</h2>
						<div className='flex flex-col gap-4 mb-8'>
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
									<span className='text-orange-500 text-xs'>
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
									<span className='text-orange-500 text-xs'>
										A senha deve ter entre 4 e 60 caracteres.
									</span>
								)}
							</div>
							<div>
								<button className='bg-[#e50914] py-3 text-white font-semibold rounded-md w-full mt-4 transition'>
									Entrar
								</button>
							</div>
							<div className='flex justify-between w-full items-center'>
								<div className='flex items-center'>
									<input
										id='checkbox'
										type='checkbox'
										className='form-checkbox h-5 w-5 rounded transition duration-150 ease-in-out'
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
						<div className='mt-8 text-gray-500'>
							<div>
								{`Novo por aqui? `}
								<Link href='/'>
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
							<p className={`text-xs text-gray-400 mt-4 ${!isVisible ? 'opacity-1000 transition-opacity' : 'opacity-0'}`}>
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
		</div>
	);
};

export default AuthPage;
