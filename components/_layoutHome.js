import Header from "./_header";
import Link from "next/link";
import Image from "next/image";
import { IoIosMenu } from "react-icons/io";
import SwitchTheme from "./_switchTheme";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

export default function LayoutHome(props) {
    return (
        <>
            <Header title={props.title} />
            <header class="relative lg:sticky lg:top-0 w-screen text-gray-600 body-font border backdrop-blur-sm">
                <div class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                    <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        {
                            props?.profile ? (
                                <>
                                    <label htmlFor="my-drawer" className="drawer-button">
                                        <IoIosMenu className="text-3xl mx-3" />
                                    </label>
                                    <Link href={"notification"} className="text-3xl mr-12 hover:text-indigo-600 tooltip tooltip-right" data-tip='notification'><IoMdNotifications /></Link>
                                </>
                            ) : (
                                <Link href={""} class="mr-12 hover:text-indigo-600">About Us</Link>
                            )
                        }
                    </nav>

                    <a href="/" class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                        <Image src="/communify.png" alt="communify" width={30} height={0} />
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        <span class="ml-3 text-xl">Communify</span>
                    </a>

                    <div class="lg:w-2/5 inline-flex lg:justify-end mt-4 lg:ml-0 lg:mt-0 items-center">
                        <div className="flex items-center">
                            <label htmlFor="search-item"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg></label>
                            <input className="border border-gray-200 rounded-2xl mx-2 py-1 px-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="search" name="search-items" placeholder="Search" onChange={(e) => props?.handleSearch(e.target.value)} />
                        </div>
                        {
                            props?.profile ? (
                                <>
                                    <div className="mx-5 tooltip tooltip-left" data-tip={props.profile}>
                                        <FaUser className="text-2xl" />
                                    </div>
                                    <Link href={"/logout"}>
                                        <button class="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0">
                                            Logout
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <Link href={"/login"}>
                                    <button class="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0">
                                        Login
                                    </button>
                                </Link>
                            )
                        }
                        <div className="flex-none gap-2"><SwitchTheme /></div>
                    </div>
                </div>
            </header >
        </>
    )
}