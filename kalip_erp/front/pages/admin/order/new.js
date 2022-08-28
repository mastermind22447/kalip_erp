import React from "react";

import OrderForm from "components/Orders/OrderForm";


import Admin from "layouts/Admin.js";

export default function Tables() {
  return (
    <>
        <OrderForm />
    </>
  );
}

Tables.layout = Admin;
