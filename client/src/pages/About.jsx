import { Link } from "react-router-dom"
export default function About() {
    return (
        <div className="mb-20">
            <Link to={'/account/profile/navigations'} className="border p-3 text-white rounded-xl bg-primary mx-4">Go Back</Link>
            <h1 className="text-xl font-semibold text-center mb-10">About Myself</h1>
            <div className="border bg-sixth text-white px-6 py-4 rounded-2xl min-h-[400px] max-w-[1200px] mx-auto">
                <p className="mt-6 mx-5">Myself <b>Mohammed Ashique V T, the sole developer of this web App.</b>
                </p>
            </div>
        </div>
    )
}