import React from "react";

import OrderDetail from "components/Orders/OrderDetail";


import Admin from "layouts/Admin.js";

export default function Tables() {
  return (
    <>
        <OrderDetail />
    </>
  );
}

Tables.layout = Admin;
