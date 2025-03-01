import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { neon } from '@neondatabase/serverless';
const sql = neon(`${process.env.DATABASE_URL}`);

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers:[
    CredentialsProvider({
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials) {
      console.log("🟡 正在验证用户:", credentials?.email);
      //
      if (!credentials?.email || !credentials?.password) {
        console.log("❌ 电子邮件或密码为空");
        return null;
      }
      //
      const response = await sql`
       SELECT * FROM users WHERE email=${credentials?.email}`;
      const user = response[0];

      if (!user) {
        console.log("❌ 用户不存在");
        return null;  // 用户不存在，认证失败
      }
      //
      if (typeof user.password !== "string") {
        console.log("❌ 用户密码无效");
        return null;
      }
      //
      const passwordCorrect = await compare(credentials?.password || '', user.password);
      console.log({passwordCorrect});
     
      if (!passwordCorrect) {
        console.log("❌ 密码错误");
        return null;
      }
    
      console.log("✅ 认证成功:", user.email);

        return {
          id: user.id.toString(),
          email: user.email,
        }
      
    }
  })]
})

export {handler as GET, handler as POST};