--

1.  npx create-next-app@latest david_next_auth
2.  vercel
    storage --> create database --> neon(serverless postgres) --> continue -->
    database name: david_auth_database
3.  git
    git remote add origin https://github.com/wwldavid/david_next_auth.git
    git push -u origin main
4.  vercel
    overview --> add new project --> david_next_auth import --> deploy
    connect project (david_auth_database to david_next_auth)
5.  pnpm i -g vercel
    vercel link
6.  vercel env pull .env.development.local
7.  pnpm add bcryptjs next-auth
    （import bcrypt from "bcryptjs"）

--

8. login and register

--

9.  vercel
    storage --> data --> query -->
    CREATE TABLE users(
    id SERIAL PRIMARY key,
    email TEXT NOT null,
    password TEXT NOT null
    );
    ALTER TABLE users
    ADD constraint unique_email UNIQUE (email);

-- 10. pnpm install @neondatabase/serverless

-- login

at the end of .env.development.local
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="----"
openssl rand -base64 32

-- middleware

-- Vercel
Vercel --> david_next_auth --> Settings --> Environment Variables --> add :
Key: NEXTAUTH_URL
Value: https://david-next-auth.vercel.app/
Key: NEXTAUTH_SECRET
Value: ----

--
