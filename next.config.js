/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'https://next-demo-one-puce.vercel.app',
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit',
    DB_URI:
      'mongodb+srv://sashamakogon94:AUI2YseTcR2GUb27@bookit.p3ayzy2.mongodb.net/bookit?retryWrites=true&w=majority&appName=bookit',

    STRIPE_WEBHOOK_SECRET: 'whsec_7HD5AXWfVlCfThgHLGjdnbnxCKpUXaMo',

    STRIPE_SECRET_KEY:
      'sk_test_51OzDFBCOBuQuN1pLRYBQD1UbZNDfJGgDKiA7jFQE2SaBnnAYWrelBVBr295hTAzhm1fgNepliGLJbKVVJQ9mCWcv00tSQhqsrL',

    CLOUDINARY_CLOUD_NAME: 'dj2w2gelc',
    CLOUDINARY_API_KEY: '323498829736676',
    CLOUDINARY_API_SECRET: 'fOGi3Jw3jLusQCB3f3dXpMR12sc',

    SMTP_HOST: 'sandbox.smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '806c8de400e449',
    SMTP_PASSWORD: '628aa304216a9d',
    SMTP_FROM_EMAIL: 'noreply@bookit.com',
    SMTP_FROM_NAME: 'BookIT',

    GEOCODER_API_KEY: 'pk.9e5fc3b7866c642258f5d078c74253d1',
    GEOCODER_PROVIDER: 'locationiq',

    NEXTAUTH_URL: 'https://next-demo-one-puce.vercel.app',
    NEXTAUTH_SECRET: '7SRgGmEBbYCB+144Yk/cr3Vd+uY61/AMwZsgBr7bcIk=',
    REVALIDATE_TOKEN: 'jsaaowiii_wadawkkakkkwkdawd212412ed',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
