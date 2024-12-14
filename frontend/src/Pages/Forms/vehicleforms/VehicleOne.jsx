import React from 'react'
import { Link } from "react-router-dom";
import PageOne from '../../../components/form/Pageone'
import Button from "../../../components/form/Button.jsx";

export default function VehicleOne() {
  return (
   
      <div>
      <PageOne/>
      <div className="flex justify-end max-w-full w-[12%] m-auto mt-5 mb-5 " style={{ marginLeft: "60%" }}>
      <Link to = "/vehicle-details-VehicleTwo"
       className="text-lg font-medium px-6 py-2 text-center text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition cursor-pointer w-full">
          Next
          </Link>
      </div>

    </div>
    
  )
}
