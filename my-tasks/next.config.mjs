/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable static export so Capacitor can load built assets from /out
	output: 'export',
	// Next/Image optimization requires a server; disable for static export
	images: {
		unoptimized: true,
	},
	// Improves compatibility with certain static hosts and Capacitor routing
	trailingSlash: true,
};

export default nextConfig;
