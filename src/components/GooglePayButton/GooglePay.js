import React, { useState } from "react";
import GooglePayButton from "@google-pay/button-react";

export default function GooglePay({
  precio,
  onError,
  onCancel,
  onLoadPaymentData,
  disable,
}) {
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "BCR2DN6TR764XZKX",
      merchantName: "Hostal App",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: precio.toString(),
      currencyCode: "EUR",
      countryCode: "ES",
    },
  };

  return (
    <div className="">
      <GooglePayButton
        environment="TEST"
        buttonColor={"default"}
        buttonType={"buy"}
        buttonSizeMode={"static"}
        paymentRequest={paymentRequest}
        onLoadPaymentData={onLoadPaymentData}
        onCancel={onCancel}
        onError={onError}
        style={{ width: 120, height: 60, pointerEvents: `${disable}` }}
      />
    </div>
  );
}
