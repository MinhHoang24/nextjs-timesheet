import HomeLayout from "@/components/layouts/HomeLayout";
import Link from "next/link";
import '@app/home/homePage.css';

export default function HomePage() {
    return (
        <HomeLayout>
            <h1>this is home page</h1>
            <Link href="/login">go to login</Link>
        </HomeLayout>
    )
}