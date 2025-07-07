# Portfolio Webapp

A modern portfolio web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Authentication**: Email/password and Google OAuth login
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Beautiful components with shadcn/ui
- **Type Safety**: Full TypeScript support

## Google OAuth Setup

To enable Google login functionality:

1. **Create a Google OAuth 2.0 Client**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" and create an OAuth 2.0 Client ID
   - Add your domain to authorized origins
   - Add your redirect URI (e.g., `http://localhost:3000` for development)

2. **Environment Variables**:
   Create a `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
   NEXT_PUBLIC_API_URL=your_backend_api_url_here
   ```

3. **Backend API Endpoint**:
   Your backend should have a `/api/auth/google-login` endpoint that:
   - Accepts an `idToken` in the request body
   - Verifies the token with Google
   - Creates or fetches the user from your database
   - Returns your own JWT token and user data

   Expected request format:
   ```json
   {
     "idToken": "google_id_token_here"
   }
   ```

   Expected response format:
   ```json
   {
     "success": true,
     "message": "Login successful",
     "data": {
       "token": "your_jwt_token",
       "userFromDb": {
         "id": "user_id",
         "email": "user@example.com",
         "name": "User Name"
       }
     }
   }
   ```

## Usage

The Google login is automatically integrated into the auth page. Users can click the "Continue with Google" button to sign in using their Google account.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
