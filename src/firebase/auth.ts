import { auth } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		return result.user;
	} catch (error) {
		window.alert("Lỗi đăng nhập: " + error);
		console.error("Lỗi đăng nhập:", error);
	}
};

export const handleLogout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		window.alert("Lỗi khi đăng xuất: " + error);
		console.error("Lỗi khi đăng xuất:", error);
	}
};