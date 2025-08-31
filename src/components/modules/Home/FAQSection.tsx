import Title from "@/hooks/Header";

export default function FAQSection() {
  return (
    <div className="max-w-4xl mx-auto py-10 md:py-20 px-6">
      <Title title={"Frequently asked Questions"} />
      <div className="space-y-4">
        <details
          className="group border-s-4 border border-gray-400 bg-accent p-4 dark:border-gray-700 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex items-center justify-between gap-1.5 text-gray-900 dark:text-white">
            <h2 className="text-lg font-medium">
              What services does SomoyXpress Courier provide?
            </h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="pt-4 text-gray-900 dark:text-white">
            Revel in the excellence of E-commerce delivery, pick-and-drop ,
            cutting-edge warehousing, entrust your goods to our state-of-the-art
            warehousing, and witness perfection in packaging solutions.
          </p>
        </details>

        <details className="group border-s-4 border  border-gray-400 bg-accent p-4 dark:border-gray-700 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 text-gray-900 dark:text-white">
            <h2 className="text-lg font-medium">
              Why SomoyXpress Courier You choose?
            </h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="pt-4 text-gray-900 dark:text-white">
            SomoyXpress Courier stands out for its commitment to delivering
            parcels nationwide on time and without any hassle. We pride
            ourselves on offering fast payment, easy tracking, a dedicated
            customer service team, and ensuring the safe delivery of your
            parcels.
          </p>
        </details>

        <details className="group border-s-4 border border-gray-400 bg-accent p-4 dark:border-gray-700 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 text-gray-900 dark:text-white">
            <h2 className="text-lg font-medium">
              What services does SomoyXpress Courier provide?
            </h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="pt-4 text-gray-900 dark:text-white">
            Revel in the excellence of E-commerce delivery, pick-and-drop ,
            cutting-edge warehousing, entrust your goods to our state-of-the-art
            warehousing, and witness perfection in packaging solutions
          </p>
        </details>
        <details className="group border-s-4 border border-gray-400 bg-accent p-4 dark:border-gray-700 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 text-gray-900 dark:text-white">
            <h2 className="text-lg font-medium">
              What is the COD &amp; Parcel Return Charge?
            </h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="pt-4 text-gray-900 dark:text-white">
            For cash-on-delivery orders through SomoyXpress Courier, a COD
            charge of 0.5% for parcels within Dhaka Metropolitan City and 1% for
            parcels outside Dhaka City is applicable.
          </p>
          <p className="pt-4 text-gray-900 dark:text-white">
            In case of parcel return, 50% of the delivery charge will be added
            as return charge along with delivery charge for return deliveries of
            outside Dhaka but return charge is not applicable for orders within
            the Dhaka-Dhaka metro area (for partial and exchange deliveries
            within the Dhaka-Dhaka metro area, return charges will also be
            applicable).
          </p>
        </details>
        <details className="group border-s-4 border border-gray-400 bg-accent p-4 dark:border-gray-700 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 text-gray-900 dark:text-white">
            <h2 className="text-lg font-medium">How can I track my parcel?</h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="pt-4 text-gray-900 dark:text-white">
            SomoyXpress Courier enables you to live track your parcel anytime
            you want. Your courier parcel can be tracked anytime using the
            SomoyXpress user app. Open the SomoyXpress app and navigate to the
            More Tracking tab. There, under the registered phone number of your
            SomoyXpress user app, you can check the updates of all the parcels
            that have been requested for delivery through SomoyXpress courier
            service. Besides, you can track the current location of the
            particular parcel with the consignment ID and your phone number from
            the “Track Delivery” option of this menu. However, only parcels
            requested using your SomoyXpress user account’s registered phone
            number can be tracked using this option.
          </p>
        </details>
      </div>
    </div>
  );
}
