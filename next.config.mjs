/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost' },
            { hostname: 'whynot-photos-server.onrender.com' }
        ]
    },
};

export default nextConfig;
