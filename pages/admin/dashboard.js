import LayoutAdmin from "@/components/_layoutAdmin"
import CardStats from "@/components/_statusCard";
import axios from "axios";
import Link from "next/link";

export default function Dashboard({ data }) {
    return (
        <>
            <LayoutAdmin title="Dashboard">
                <div className="relative bg-blue-950 md:pt-10 pb-32 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div>
                            {/* Card stats */}
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                    <CardStats
                                        statSubtitle="TRAFFIC"
                                        statTitle="350,897"
                                        statArrow="up"
                                        statPercent="3.48"
                                        statPercentColor="text-emerald-500"
                                        statDescripiron="Since last month"
                                        statIconName="MdTraffic"
                                        statIconColor="bg-red-500"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                    <CardStats
                                        statSubtitle="INSTRUCTORS"
                                        statTitle={data?.instructor}
                                        statArrow="down"
                                        statPercent="3.48"
                                        statPercentColor="text-red-500"
                                        statDescripiron="Since last month"
                                        statIconName="FaUserTie"
                                        statIconColor="bg-orange-500"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                    <CardStats
                                        statSubtitle="STUDENTS"
                                        statTitle={data?.student}
                                        statArrow="down"
                                        statPercent="1.10"
                                        statPercentColor="text-orange-500"
                                        statDescripiron="Since last month"
                                        statIconName="FaUserGraduate"
                                        statIconColor="bg-pink-500"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 ">
                                    <CardStats
                                        statSubtitle="COURSES"
                                        statTitle="49,65"
                                        statArrow="up"
                                        statPercent="12"
                                        statPercentColor="text-emerald-500"
                                        statDescripiron="Since last month"
                                        statIconName="FaBook"
                                        statIconColor="bg-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/admin/dashboard');
    const data = await res.data;

    return { props: { data } }
}
