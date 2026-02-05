export const Footer = () => {
	return (
		<footer className="w-full py-4 bg-gray-100">
			<div className="container w-full mx-auto px-4 sm:px-6">
				<p className="text-center text-sm text-gray-500">
					{/* &copy; {new Date().getFullYear()} TripDi x NgocGiap. All rights reserved. */}
					Handcrafted with ❤️ by Giap in {new Date().getFullYear()}.
				</p>
			</div>
		</footer>
	);
};