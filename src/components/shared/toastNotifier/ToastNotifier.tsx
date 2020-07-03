import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "./ReactToastify.css"

export const ToastNotifier = () => {
    return <>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
        />
    </>
}