import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../config/firebase";
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login successful!');
        // Redirect to another page
        router.push('/dashboard');
    } catch (err) {
        console.error(err);
        toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleEmailLogin}>Login</button>
      <br />
    </div>
  );
}