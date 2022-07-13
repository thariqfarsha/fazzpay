/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_BACKEND: "https://fazzpay.herokuapp.com",
    URL_BACKEND2: "https://jsonplaceholder.typicode.com",
    URL_CLOUDINARY:
      "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/",
    URL_RESETPASSWORD: "ezpay.vercel.app/auth/reset-password",
  },
  images: {
    domains: ["res.cloudinary.com", "i.pravatar.cc"],
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
    ];
  },
};

module.exports = nextConfig;
