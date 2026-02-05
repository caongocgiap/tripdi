import { Navigate } from 'react-router-dom';
import { auth } from '@/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '@/components/ui/spinner';

const ADMIN_EMAIL = "giaptapcode.dev@gmail.com";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const [user, loading] = useAuthState(auth);

	if (loading) return (
		<div className="flex items-center justify-center h-screen">
			<Spinner className="w-10 h-10" />
			<p className="text-lg font-bold">Checking access...</p>
		</div>
	);

	if (!user || user.email !== ADMIN_EMAIL) {
		return <Navigate to="/403" replace />;
	}

	return children;
};