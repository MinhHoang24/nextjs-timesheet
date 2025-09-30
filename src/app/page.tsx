"use client";
import HomeLayout from "@/components/layouts/HomeLayout";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
    const router = useRouter();

    useEffect(() => {
        router.push("/home");
    }, [router]);
    
  return (
    <HomeLayout>
        <MainLayout>
            <p>redirecting to home ...</p>
        </MainLayout>
    </HomeLayout>
  );
}