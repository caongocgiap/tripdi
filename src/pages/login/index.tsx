import { useEffect } from "react";
import { auth } from '@/config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaMapPin } from "react-icons/fa";

const LoginPage = () => {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/admin');
		}
	}, [user, navigate]);

	const handleLogin = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error("Login error:", error);
			alert("Login failed, please try again!");
		}
	};

	if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

	return (
		<div className="h-screen w-full flex items-center justify-center bg-[#faf9f6]">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-md w-full p-8 bg-white rounded-[2rem] shadow-xl border border-gray-100 text-center"
			>
				<div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full text-orange-600">
					<FaMapPin size={28} />
				</div>

				<h1 className="text-3xl font-bold text-gray-900 mb-2">Hello Giap!</h1>
				<p className="text-gray-500 mb-8">Login with Google to manage your trip TripDi.</p>

				<button
					onClick={handleLogin}
					className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-4 px-6 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-orange-200 transition-all duration-300 shadow-sm"
				>
					<FaGoogle size={22} className="text-red-500" />
					<span>Continue with Google</span>
				</button>

				<div className="mt-8">
					<button
						onClick={() => navigate('/')}
						className="text-sm text-gray-400 hover:text-orange-600 transition-colors"
					>
						← Back to home
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;