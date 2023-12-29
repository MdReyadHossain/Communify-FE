import LayoutAdmin from "@/components/_layoutAdmin"
import axios from "axios";
import Link from "next/link";

export default function Student({ data }) {
    return (
        <>
            <LayoutAdmin title="Admin Panel">
                <div className="flex flex-col">
                    {data.map(item => (
                        <div className="text-xl font-bold w-auto bg-white shadow-xl p-6 m-1 flex items-center">{item.student_name}</div>
                    ))}
                </div>
            </LayoutAdmin>
        </>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/admin/student');
    const data = await res.data;

    return { props: { data } }
}

