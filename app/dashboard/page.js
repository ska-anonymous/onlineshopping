'use client';
import Navbar from "@/components/Navbar";
import { useContext } from "react";
import { AppContext } from "../appcontextprovider";
import Sidebar from "@/components/Sidebar";

const dashboard = () => {

    const { user } = useContext(AppContext);

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <div className="container mt-5">
                            <div className="card">
                                {
                                    user &&
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                                        <p className="card-text">{user.role}</p>
                                        <p className="card-text">Account created on: {new Date(user.createdAt).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })}</p>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default dashboard;