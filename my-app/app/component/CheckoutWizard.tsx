import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="flex flex-row w-4/5 mx-auto">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-4 text-center text-lg font-bold tracking-wide text-slate-700 
                ${index <= activeStep ? "border-slate-800" : "border-slate-300"}
                `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
