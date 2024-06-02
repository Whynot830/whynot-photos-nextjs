/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost' },
            { hostname: 'whynot-photos-server.onrender.com' },
            { hostname: 'res.cloudinary.com' }
        ]
    },
};

export default nextConfig;
