import React from "react";
import { Link } from "react-router-dom";
import { URL } from "libs/constants";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";

const NotFound = () => {
    return (
        <div>
            <Nav />
            <div className="flex flex-col items-center py-10 bg-slate-50">
                <div className="text-4xl font-bold text-center">Page Not Found</div>
                <div className="pt-8 text-xl text-center">We're sorry, but that page cannot be found. Please check the link URL and try again.</div>
                <Link to={URL.HOME} className="px-5 py-1 my-10 text-lg text-teal-700 transition-all duration-200 border border-teal-700 rounded-md hover:bg-teal-700 hover:text-white hover:shadow-md">Go to Home</Link>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound;