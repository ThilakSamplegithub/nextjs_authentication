"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
const SignupPage = () => {
  const router=useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });

  async function onSignup(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    try{
    e.preventDefault()
    console.log(user,'is user')
    const {email,password,userName}=user
    await axios.post('/api/users/signup',{email,password,userName})
    router.push('/login')
    }catch(err:any){
      console.log(err.message)
    }
    

  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen">
      <h1 className="text-center text-2xl ">SignUp</h1>
      <hr />
      <form onSubmit={onSignup} className="flex flex-col items-center gap-2">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type='text'
        placeholder="username"
        value={user.userName}
        onChange={(e) => setUser({ ...user, userName: e.target.value })}
        className="border rounded-lg focus:outline-none border-gray-300 focus:border-gray-600"
      />
      <label htmlFor="Email" >Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border rounded-lg focus:outline-none border-gray-300 focus:border-gray-600"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type='password'
        placeholder="Enter password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border rounded-lg focus:outline-none border-gray-300 focus:border-gray-600"
      />
      <button className="border rounded-lg focus:outline-none border-gray-300 focus:border-gray-600 p-2" type="submit">SignUp</button>
      </form>
      <Link href={'/login'}>Visit Login Page</Link>
    </div>
  );
};

export default SignupPage;
