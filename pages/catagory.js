import LayoutHome from "@/components/_layoutHome";
import axios from "axios";

export default function Catagory({ data }) {
    return (
        <>
            <LayoutHome title="Catagories" />
            <h1 className="text-lg font-bold tracking-wide">Catagory: </h1>

            <ul>
                {data.map(item => (
                    <li>{item.Catagoryname}</li>
                ))}
            </ul>
            <div className="h-screen w-screen bg-slate-400"></div>
        </>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/admin/catagory?order=ASC');
    const data = await res.data;

    return { props: { data } }
}
