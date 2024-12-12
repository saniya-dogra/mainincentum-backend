import React from 'react'
import { Link } from "react-router-dom";
import PageOne from '../../../components/form/Pageone'
import Button from "../../../components/form/Button.jsx";


const HomeOne = () => {
  return (
    <div>
      <PageOne/>
      <div className="mt-8">
          <Link to="/Home-details-HomeTwo">
          <Button />
          </Link>
        </div>
    </div>
  );
};

export default HomeOne;