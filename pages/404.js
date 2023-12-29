import LayoutHome from "@/components/_layoutHome";
import Link from "next/link";

export default function error404() {
    return (
        <>
            <LayoutHome title="Page not found" />
            <div className="flex-col">
                <div className="text-center">
                    <h1 className="text-3xl">Oops</h1>
                    <h1 className="text-2xl font-bold">404 Not found</h1>
                    <br />
                    <br />
                    <Link href={"/"}><button className="border p-2 rounded-3xl bg-black text-white hover:bg-white hover:text-black">Go to Home Page</button></Link>
                </div>
            </div>

        </>
    )
}