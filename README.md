This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Ariviyaa

## Demo admin access (frontend review build)

The admin panel at `/admin` needs a sign-in. Until the backend is connected, sign-in is simulated in the browser:

| Email | Role | Can open |
| --- | --- | --- |
| admin@ariviyaa.com | Owner | Everything, including Payments and Settings |
| ops@ariviyaa.com | Operations | Dashboard, Orders, Returns, Products, Shipping |
| support@ariviyaa.com | Support | Dashboard, Orders, Returns, Customers, Enquiries |

Any password of 8 or more characters works for these emails. Five wrong attempts lock the form for 60 seconds, and an idle session signs out after 30 minutes.

This is **not real security**: data and sessions live in `localStorage`. Before go-live the backend must provide hashed passwords, an httpOnly session cookie, a server-side check on every `/admin` request (e.g. in `proxy.ts`), and role checks on every admin API call.
