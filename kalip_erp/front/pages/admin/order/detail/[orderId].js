import React from "react";

import OrderDetail from "components/Orders/OrderDetail";
import { useRouter } from 'next/router'

import Admin from "layouts/Admin.js";

export default function Tables() {
    const router = useRouter()
    const { orderId } = router.query
    return (
        <>
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
            <OrderDetail orderId={orderId} />
            </div>
        </div>
        </>
    );
}

Tables.layout = Admin;
