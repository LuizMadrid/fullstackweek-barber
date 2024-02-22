/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/f/**'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/a/**'
			},
			{
				protocol: 'https',
				hostname: 'cdn.pixabay.com',
				port: '',
				pathname: '/photo/**'
			},
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
				port: '',
				pathname: '/wikipedia/commons/**'
			},
		]
	},
};

export default nextConfig;