import { Outlet } from "react-router-dom";
import Profile from "./pages/ProfilePage";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
export default function ProfileLayout(){
    return(
        <div className="p-3 flex flex-col relative min-h-screen">
            <Profile/>
            <Outlet/>
        </div>
    )
}