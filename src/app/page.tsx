"use client";

import auth from "@/config/firebase.config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const login = () => {
    router.push("/user/login");
  };
  const logout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
  };

  const [currUser, setCurrUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrUser(user);
      setIsLoggedIn(true);
      setDisplayName(user.displayName);
    } else {
      setCurrUser(null);
      setIsLoggedIn(false);
      setDisplayName(null);
    }
  }, [isLoggedIn]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setCurrUser(user);
  //     setIsLoggedIn(currUser != null);
  //     setDisplayName(user.displayName);
  //   } else {
  //     setCurrUser(null);
  //     setIsLoggedIn(currUser != null);
  //   }
  // });

  return (
    <div className="flex h-full w-full my-10 mx-10">
      <button
        onClick={isLoggedIn ? logout : login}
        className="bg-orange-500 border-2 hover:bg-orange-700 rounded-md px-3 py-3 transition"
      >
        {isLoggedIn ? displayName + " : Logout" : "Login"}
      </button>
    </div>
  );
}
