import React, { useState } from "react";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import MedicineOrder from "./MedicineOrder/MedicineOrder";
import Cart from "./Cart/Cart";
import { useRouter } from "next/router";

const Medicine = ({ data, search_medicine }) => {
  const [search, setSearch] = useState("" || search_medicine);
  const [searchHide, setSearchHide] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [cross, setCross] = useState(false);
  const [activeStyle, setActiveStyle] = useState(false);
  const [medicineLines, setMedicineLines] = useState([]);
  const [popup, setPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const api = process.env.NEXT_PUBLIC_API_URL;
  //   const { stateAuth } = useContext(Auth);
  //   const token = stateAuth?.token;
  //   const { stateUser } = useContext(UserInfo);
  //   const userDetail = stateUser?.info;

  console.log(data, 1);
  console.log(search_medicine, 2);

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();

    if (value.length > 0) {
      setSearchHide(true);
      setCross(true);
    } else {
      setSearchHide(false);
      setCross(false);
    }
    setSearch(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeoutId = setTimeout(() => {
      router.replace(
        {
          pathname: "/",
          query: { ...router.query, search_medicine: value },
        },
        undefined,
        { scroll: false }
      );
    }, 300);
    setDebounceTimeout(timeoutId);
  };

  const removeItem = (index) => {
    setMedicineLines([
      ...medicineLines.slice(0, index),
      ...medicineLines.slice(index + 1, medicineLines.length),
    ]);
  };

  let totalDisplay = 0;
  medicineLines.forEach((item) =>
    item.total !== null
      ? (totalDisplay = totalDisplay + item.total)
      : totalDisplay
  );

  const refreshPage = () => {
    window.location.reload();
  };

  // login modal open
  const handleShowModal = () => {
    setShowModal(true);
    setActiveStyle(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const details = [
      {
        service_name: "medicine_order",
        patient_id: userDetail?.id,
        service_issuer_id: userDetail?.id,
        service_issuer_type: "main site",
        order_placement: dateTime,
        order_completion: null,
        remarks: "Order from main website please call for details",
        current_address: "Dhaka",

        order_value: totalDisplay,
        order_status: "pending",
        discount_percent: 8,
        payable_amount: totalDisplay - totalDisplay * 0.08,
        payment_by_customer: 0,
        payment_pending: totalDisplay - totalDisplay * 0.08,
        last_payment_date: null,
        payment_method: "cash on delivery",
        payment_status: "pending",

        service_provider_type: "pharmacy",
        service_provider_id: 1,
        service_provider_fee: 0,
        service_provider_fee_paid: 0,
        service_provider_fee_pending: 0,
        service_provider_fee_last_update: null,
        service_provider_fee_status: "",

        referral_type: null,
        referral_id: 1,
        referral_provider_fee: 0,
        referral_provider_fee_paid: 0,
        referral_provider_fee_pending: 0,
        referral_provider_fee_last_update: 0,
        referral_provider_fee_status: null,
      },
      medicineLines,
    ];

    let postFetch = await fetch(`${api}/patients/service/medicines`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    });

    if (postFetch.ok) {
      setMedicineLines([]);
      setIsOpen(true);
      alert("Medicine Order Successful!");
    } else {
      alert("Something went wrong!, Fill the quantity properly!");
    }
  };
  return (
    <div>
      <Hero />
      <Features />
      <MedicineOrder
        data={data}
        search={search}
        setSearch={setSearch}
        searchHide={searchHide}
        setSearchHide={setSearchHide}
        cross={cross}
        setCross={setCross}
        handleSearchChange={handleSearchChange}
        setMedicineLines={setMedicineLines}
      />
      <Cart
        medicineLines={medicineLines}
        removeItem={removeItem}
        setMedicineLines={setMedicineLines}
      />
    </div>
  );
};

export default Medicine;
