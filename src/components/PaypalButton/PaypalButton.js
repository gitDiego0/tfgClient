import React, { useState, useRef } from "react";
import Paypal from "gatsby-plugin-paypal";

export default function PaypalButton({
  amount,
  onApprove,
  onError,
  onSuccess,
  onCancel,
}) {
  return (
    <Paypal
      style={{
        shape: "rect",
        color: "blue",
        layout: "horizontal",
        label: "paypal",
      }}
      amount={amount}
      currency="EUR"
      onApprove={onApprove}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
}
