'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials',{
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    // 处理登录失败的情况
  if (response?.error) {
    console.log("❌ 登录失败:", response.error);
    // 显示错误提示给用户，或进行其他处理
    return;
  }

  // 登录成功，跳转到首页
  router.push("/");
  router.refresh();
    
   
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-20">
        <input name="email" className="border border-teal-500 text-black" type="email" />
        <input name="password" className="border border-teal-500 text-black" type="password" />
        <button type="submit">Login</button>
    </form>
  )
}