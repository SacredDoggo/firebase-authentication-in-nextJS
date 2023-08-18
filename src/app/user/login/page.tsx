"use client";

import Input from "@/components/Input";
import Loader from "@/components/Loader";
import auth from "@/config/firebase.config";
import axios from "axios";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function Page() {
  const router = useRouter();
  // const [variant, setVariant] = useState("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<Boolean>(false);

  const [loading, setLoading] = useState<Boolean>(false);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then(function (e: any) {
          router.push("/");
        })
        .catch(function (error: any) {
          setLoading(false);
          alert(error);
        });
    } catch (error) {
      alert(error);
      console.log(error);
      setLoading(false);
    }
  }, [email, password]);

  return (
    <div className="relative h-full w-full">
      <div className="flex justify-center">
        <div className="px-10 py-10 bg-white mt-20 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-black text-xl mb-8 font-semibold text-center">
            Login to your Account
          </h2>

          <Input
            label="Email"
            id="email"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeHolder="Email"
          />

          <Input
            label="Password"
            id="password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeHolder="Password"
            type="password"
          />
          <div className="flex mt-4">
            <Input
              id="rememberMe"
              onChange={(e: any) => {
                setRememberMe(e.target.checked);
              }}
              placeHolder="Password"
              type="checkbox"
            />
            <p className="ml-2">Remember Me</p>
          </div>
          <button
            onClick={login}
            className="bg-[#0069ac] rounded-md text-white w-full py-3 mt-10 hover:bg-[#0063a0] transition"
          >
            {loading ? "<Loader />" : "Login"}
          </button>
          <p className="mt-8 text-center">
            Need an account?{" "}
            <Link
              href="/user/register"
              className="hover:underline hover:cursor-pointer text-cyan-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
