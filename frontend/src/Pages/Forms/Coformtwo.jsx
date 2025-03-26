import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/form/Input.jsx";
import Dropdown from "../../components/form/Dropdown.jsx";
import Button from "../../components/form/Button.jsx";
import { FaUser } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveLoanApplication } from "../../store/formOneSlice.js";
import { UserContext } from "../../contextapi/UserContext.jsx";

const CoformTwo = () => {
  const location = useLocation();
  const { numberOfApplicants = 1, applicants = [] } = location.state || {};
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.form);
  const { user } = useContext(UserContext);

  const initialFormValues = {
    loan: "",
    applicants: Array.from({ length: numberOfApplicants }, () => ({
      user_type: "",
      organisation_name: "",
      organisation_type: "",
      designation_salaried: "",
      currentOrganizationExperience: "",
      previousOrganizationExperience: "",
      monthly_salary: "",
      place_of_posting: "",
      salary_bank_name: "",
      company_name: "",
      company_type: "",
      incorporation_date: "",
      designation_self: "",
      years_in_business: "",
      years_of_itr_filing: "",
    })),
    property_finalised: "",
    property_address: "",
    agreement_executed: "",
    agreement_mou_value: "",
    loan_amount_required: "",
    preferred_banks: "",
    vehicleModel: "",
    expectedDeliveryDate: "",
    dealerName: "",
    dealerCity: "",
    vehiclePrice: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({
    loan: "",
    loan_amount_required: "",
    agreement_mou_value: "",
    vehiclePrice: "",
    applicants: Array(numberOfApplicants).fill({}),
  });

  const handleInputChange = (e, applicantIndex = null) => {
    const { name, value } = e.target;
    if (applicantIndex !== null) {
      setFormValues((prevState) => ({
        ...prevState,
        applicants: prevState.applicants.map((applicant, idx) =>
          idx === applicantIndex ? { ...applicant, [name]: value } : applicant
        ),
      }));
      setErrors((prev) => ({
        ...prev,
        applicants: prev.applicants.map((applicantErrors, idx) =>
          idx === applicantIndex ? { ...applicantErrors, [name]: "" } : applicantErrors
        ),
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOptionSelect = (name, option, applicantIndex = null) => {
    if (applicantIndex !== null) {
      setFormValues((prevState) => ({
        ...prevState,
        applicants: prevState.applicants.map((applicant, idx) =>
          idx === applicantIndex ? { ...applicant, [name]: option } : applicant
        ),
      }));
      setErrors((prev) => ({
        ...prev,
        applicants: prev.applicants.map((applicantErrors, idx) =>
          idx === applicantIndex ? { ...applicantErrors, [name]: "" } : applicantErrors
        ),
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: option,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRadioChange = (name, value, applicantIndex = null) => {
    if (applicantIndex !== null) {
      setFormValues((prevState) => ({
        ...prevState,
        applicants: prevState.applicants.map((applicant, idx) =>
          idx === applicantIndex ? { ...applicant, [name]: value } : applicant
        ),
      }));
      setErrors((prev) => ({
        ...prev,
        applicants: prev.applicants.map((applicantErrors, idx) =>
          idx === applicantIndex ? { ...applicantErrors, [name]: "" } : applicantErrors
        ),
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      loan: !formValues.loan ? "This field is required" : "",
      loan_amount_required: !formValues.loan_amount_required ? "This field is required" : "",
      agreement_mou_value:
        ["Home Loan", "Business Loan", "Mortgage Loan"].includes(formValues.loan) &&
        formValues.agreement_executed === "Yes" &&
        !formValues.agreement_mou_value
          ? "This field is required"
          : "",
      vehiclePrice:
        formValues.loan === "Vehicle Loan" && !formValues.vehiclePrice
          ? "This field is required"
          : "",
      applicants: formValues.applicants.map((applicant) => ({
        user_type: !applicant.user_type ? "This field is required" : "",
      })),
    };

    setErrors(newErrors);

    const hasErrors =
      newErrors.loan ||
      newErrors.loan_amount_required ||
      newErrors.agreement_mou_value ||
      newErrors.vehiclePrice ||
      newErrors.applicants.some((applicantErrors) => Object.values(applicantErrors).some(Boolean));

    return !hasErrors;
  };

  const getNavigationPath = () => {
    const { loan } = formValues;
    if (!loan) return "#";

    const userTypes = formValues.applicants.map((applicant) => applicant.user_type || "Self-Employed");

    const paths = {
      "Home Loan": {
        Salaried: "salaried",
        "Self-Employed": "self_employed",
      },
      "Vehicle Loan": {
        Salaried: "salaried",
        "Self-Employed": "self_employed",
      },
      "Personal Loan": {
        Salaried: "salaried",
        "Self-Employed": "self_employed",
      },
      "Business Loan": {
        Salaried: "salaried",
        "Self-Employed": "self_employed",
      },
      "Mortgage Loan": {
        Salaried: "salaried",
        "Self-Employed": "self_employed",
      },
    };

    const queryParams = userTypes
      .map((userType, index) => {
        const param = paths[loan]?.[userType];
        if (!param) return "";
        return `applicant${index + 1}=${loan.toLowerCase().replace(/\s+/g, "")}&user_type=${param}`;
      })
      .filter(Boolean)
      .join("&");

    return queryParams ? `/co-applicant-form-detail-three?${queryParams}` : "#";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!user) {
      toast.error("User not authenticated. Please log in.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const transformedData = {
      userId: user?.id,
      loanType: formValues.loan,
      numberOfApplicants,
      applicants: formValues.applicants.map((applicant) => ({
        ...applicant,
        user_type: applicant.user_type || "Self-Employed",
      })),
      commonDetails: {
        property_finalised: formValues.property_finalised,
        property_address: formValues.property_address,
        agreement_executed: formValues.agreement_executed,
        agreement_mou_value: formValues.agreement_mou_value,
        loan_amount_required: formValues.loan_amount_required,
        preferred_banks: formValues.preferred_banks,
        ...(formValues.loan === "Vehicle Loan" && {
          vehicleModel: formValues.vehicleModel,
          expectedDeliveryDate: formValues.expectedDeliveryDate,
          dealerName: formValues.dealerName,
          dealerCity: formValues.dealerCity,
          vehiclePrice: formValues.vehiclePrice,
        }),
      },
    };

    console.log("Form Values Before Submission:", formValues);
    console.log("Transformed Data:", transformedData);

    try {
      const result = await dispatch(saveLoanApplication(transformedData)).unwrap();
      toast.success("Loan application saved successfully!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          const navigationPath = getNavigationPath();
          if (navigationPath !== "#") {
            navigate(navigationPath, {
              state: {
                numberOfApplicants,
                applicants: transformedData.applicants,
              },
            });
          }
        },
      });
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error(err.message || "Failed to save loan application.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const renderEmploymentDetails = (index) => (
    <div key={index} className="mt-8 p-4 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-4">
        Employment Details - Applicant {index + 1}
      </h2>
      <div className="grid grid-cols-2 w-full gap-6">
        <label className="flex items-center">
          <input
            type="radio"
            name={`user_type-${index}`}
            checked={formValues.applicants[index].user_type === "Salaried"}
            value="Salaried"
            onChange={(e) => handleRadioChange("user_type", e.target.value, index)}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="ml-3 text-white">Salaried</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name={`user_type-${index}`}
            checked={formValues.applicants[index].user_type === "Self-Employed"}
            value="Self-Employed"
            onChange={(e) => handleRadioChange("user_type", e.target.value, index)}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="ml-3 text-white">Self-Employed / Professional</span>
        </label>
      </div>
      {errors.applicants[index].user_type && (
        <p className="text-red-500 text-xs mt-2">{errors.applicants[index].user_type}</p>
      )}

      {formValues.applicants[index].user_type === "Salaried" && formValues.loan !== "Business Loan" && (
        <div className="mt-4">
          <div className="grid grid-cols-2 w-full gap-6">
            <div>
              <Input
                placeholder="Organisation Name"
                name="organisation_name"
                value={formValues.applicants[index].organisation_name}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].organisation_name && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].organisation_name}</p>
              )}
            </div>
            <div>
              <Dropdown
                options={[
                  "Central Govt.",
                  "State Govt.",
                  "Govt. Organisation",
                  "PSU",
                  "Private Limited Company",
                  "Public Limited Company",
                  "Partnership Firm",
                  "Proprietary Firm",
                  "LLP",
                  "Others",
                ]}
                placeholder="Organisation Type"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === `organisation_type-${index}`}
                id={`organisation_type-${index}`}
                value={formValues.applicants[index].organisation_type}
                onSelect={(option) => handleOptionSelect("organisation_type", option, index)}
              />
              {errors.applicants[index].organisation_type && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].organisation_type}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <div>
              <Input
                placeholder="Experience in Current Organization"
                name="currentOrganizationExperience"
                value={formValues.applicants[index].currentOrganizationExperience}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].currentOrganizationExperience && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].currentOrganizationExperience}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Experience in Previous Organization"
                name="previousOrganizationExperience"
                value={formValues.applicants[index].previousOrganizationExperience}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].previousOrganizationExperience && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].previousOrganizationExperience}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <div>
              <Input
                placeholder="Designation"
                name="designation_salaried"
                value={formValues.applicants[index].designation_salaried}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].designation_salaried && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].designation_salaried}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Place of Posting"
                name="place_of_posting"
                value={formValues.applicants[index].place_of_posting}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].place_of_posting && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].place_of_posting}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <div>
              <Input
                placeholder="Monthly Salary (in hand)"
                name="monthly_salary"
                value={formValues.applicants[index].monthly_salary}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].monthly_salary && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].monthly_salary}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Bank in which salary account is maintained"
                name="salary_bank_name"
                value={formValues.applicants[index].salary_bank_name}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].salary_bank_name && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].salary_bank_name}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {(formValues.applicants[index].user_type === "Self-Employed" || formValues.loan === "Business Loan") && (
        <div className="mt-4">
          <div className="grid grid-cols-2 w-full gap-6">
            <div>
              <Input
                placeholder="Name of Firm/Company"
                name="company_name"
                value={formValues.applicants[index].company_name}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].company_name && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].company_name}</p>
              )}
            </div>
            <div>
              <Dropdown
                options={["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"]}
                placeholder="Type of Firm"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === `company_type-${index}`}
                id={`company_type-${index}`}
                value={formValues.applicants[index].company_type}
                onSelect={(option) => handleOptionSelect("company_type", option, index)}
              />
              {errors.applicants[index].company_type && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].company_type}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <div>
              <Input
                placeholder="Firm Registration / Incorporation Date"
                name="incorporation_date"
                value={formValues.applicants[index].incorporation_date}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].incorporation_date && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].incorporation_date}</p>
              )}
            </div>
            <div>
              <Dropdown
                options={["Proprietor", "Partner", "Founder", "Director", "Others"]}
                placeholder="Designation"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === `designation_self-${index}`}
                id={`designation_self-${index}`}
                value={formValues.applicants[index].designation_self}
                onSelect={(option) => handleOptionSelect("designation_self", option, index)}
              />
              {errors.applicants[index].designation_self && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].designation_self}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <div>
              <Input
                placeholder="Years in Line of Business (VINTAGE)"
                name="years_in_business"
                value={formValues.applicants[index].years_in_business}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].years_in_business && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].years_in_business}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Years of ITR Filing (VINTAGE)"
                name="years_of_itr_filing"
                value={formValues.applicants[index].years_of_itr_filing}
                onChange={(e) => handleInputChange(e, index)}
              />
              {errors.applicants[index].years_of_itr_filing && (
                <p className="text-red-500 text-xs mt-1">{errors.applicants[index].years_of_itr_filing}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#010349f0] text-gray-900 flex flex-col lg:flex-row">
      <div className="absolute mt-20 md:mt-32 w-full h-1 bg-[#9ea0e5e7]"></div>
      <div className="w-full lg:w-1/4 py-10 px-4 lg:pl-16 flex flex-col shadow-xl relative rounded-r-3xl">
        <h2 className="text-2xl lg:text-3xl font-bold lg:mb-14 text-white tracking-wide text-center -mt-3">
          Application Process
        </h2>
        <ul className="relative mr-10 hidden lg:block">
          <div className="absolute right-6 top-12 bottom-0 w-1 bg-[#9ea0c5e7] mb-3"></div>
          <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
            <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors text-right mt-4">
              Personal Information
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 mt-4 flex items-center justify-center bg-[#484a7b] rounded-full text-black font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <FaUser className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
          <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
            <span className="text-lg lg:text-xl font-medium text-[#26cc88] group-hover:text-[#26cc88] transition-colors text-right">
              Employment Status
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#26cc88] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <FaBookOpen className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
          <li className="flex items-center justify-end space-x-6 cursor-pointer relative group">
            <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors text-right">
              Documents
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#484a7b] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <IoDocuments className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
        </ul>
        <div className="hidden lg:block absolute top-[8rem] right-0 h-screen w-1 bg-[#b1b3d7ef]">
          <div className="absolute top-[3.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
          <div className="absolute top-[10.5rem] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-[#26cc88] rounded-full"></div>
          <div className="absolute top-[17.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
        </div>
      </div>

      <div className="w-full lg:w-3/4 p-4 lg:p-10 -mt-2">
        <h1 className="text-2xl ml-12 lg:text-3xl text-white font-bold mb-3 lg:mb-3">
          Loan Application - Co-Applicant Employment Details
        </h1>
        <p className="text-white ml-12 mb-8 lg:mb-11">
          Provide employment details for {numberOfApplicants} applicant(s)
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mx-4 lg:mx-12 mt-4">
            <div>
              <Dropdown
                options={[
                  "Home Loan",
                  "Vehicle Loan",
                  "Business Loan",
                  "Personal Loan",
                  "Mortgage Loan",
                ]}
                placeholder="Loan Type"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "loan"}
                id="loan"
                value={formValues.loan}
                onSelect={(option) => handleOptionSelect("loan", option)}
              />
              {errors.loan && <p className="text-red-500 text-xs mt-1">{errors.loan}</p>}
            </div>

            {formValues.loan && (
              <>
                {["Home Loan", "Business Loan", "Mortgage Loan"].includes(formValues.loan) && (
                  <>
                    <div className="mt-10">
                      <h2 className="text-xl font-bold text-white mb-4">Property Finalised</h2>
                      <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-2 w-full gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="property_finalised"
                              checked={formValues.property_finalised === "Yes"}
                              value="Yes"
                              onChange={(e) => handleRadioChange("property_finalised", e.target.value)}
                              className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-3 text-white">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="property_finalised"
                              checked={formValues.property_finalised === "No"}
                              value="No"
                              onChange={(e) => handleRadioChange("property_finalised", e.target.value)}
                              className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-3 text-white">No</span>
                          </label>
                        </div>
                        {formValues.property_finalised === "Yes" && (
                          <div>
                            <Input
                              placeholder="Property Address (if Yes)"
                              name="property_address"
                              value={formValues.property_address}
                              onChange={handleInputChange}
                            />
                            {errors.property_address && (
                              <p className="text-red-500 text-xs mt-1">{errors.property_address}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">Agreement/MoU Executed</h2>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="agreement_executed"
                          checked={formValues.agreement_executed === "Yes"}
                          value="Yes"
                          onChange={(e) => handleRadioChange("agreement_executed", e.target.value)}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-3 text-white">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="agreement_executed"
                          checked={formValues.agreement_executed === "No"}
                          value="No"
                          onChange={(e) => handleRadioChange("agreement_executed", e.target.value)}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-3 text-white">No</span>
                      </label>
                    </div>
                    {formValues.agreement_executed === "Yes" && (
                      <div className="mt-6">
                        <Input
                          placeholder="Agreement/MoU Value (Rs.) (if Yes)"
                          name="agreement_mou_value"
                          value={formValues.agreement_mou_value}
                          onChange={handleInputChange}
                        />
                        {errors.agreement_mou_value && (
                          <p className="text-red-500 text-xs mt-1">{errors.agreement_mou_value}</p>
                        )}
                      </div>
                    )}
                  </>
                )}

                {formValues.loan === "Vehicle Loan" && (
                  <div className="mt-10">
                    <h2 className="text-xl font-bold text-white mb-4">Vehicle Details</h2>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <div>
                        <Input
                          placeholder="Make and Model of Vehicle"
                          name="vehicleModel"
                          value={formValues.vehicleModel}
                          onChange={handleInputChange}
                        />
                        {errors.vehicleModel && (
                          <p className="text-red-500 text-xs mt-1">{errors.vehicleModel}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Expected date of delivery of Vehicle"
                          name="expectedDeliveryDate"
                          value={formValues.expectedDeliveryDate}
                          onChange={handleInputChange}
                        />
                        {errors.expectedDeliveryDate && (
                          <p className="text-red-500 text-xs mt-1">{errors.expectedDeliveryDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <div>
                        <Input
                          placeholder="Dealer Name"
                          name="dealerName"
                          value={formValues.dealerName}
                          onChange={handleInputChange}
                        />
                        {errors.dealerName && (
                          <p className="text-red-500 text-xs mt-1">{errors.dealerName}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Dealer City"
                          name="dealerCity"
                          value={formValues.dealerCity}
                          onChange={handleInputChange}
                        />
                        {errors.dealerCity && (
                          <p className="text-red-500 text-xs mt-1">{errors.dealerCity}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <div>
                        <Input
                          placeholder="Price of Vehicle"
                          name="vehiclePrice"
                          value={formValues.vehiclePrice}
                          onChange={handleInputChange}
                        />
                        {errors.vehiclePrice && (
                          <p className="text-red-500 text-xs mt-1">{errors.vehiclePrice}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <h2 className="text-xl font-bold text-white mt-6 mb-4">Loan Required</h2>
                <div className="grid grid-cols-2 w-full gap-6 mt-6">
                  <div>
                    <Input
                      placeholder="Loan Amount Required (Rs.)"
                      name="loan_amount_required"
                      value={formValues.loan_amount_required}
                      onChange={handleInputChange}
                    />
                    {errors.loan_amount_required && (
                      <p className="text-red-500 text-xs mt-1">{errors.loan_amount_required}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Enter Your Preferred Banks"
                      name="preferred_banks"
                      value={formValues.preferred_banks}
                      onChange={handleInputChange}
                    />
                    {errors.preferred_banks && (
                      <p className="text-red-500 text-xs mt-1">{errors.preferred_banks}</p>
                    )}
                  </div>
                </div>

                {formValues.applicants.map((_, index) => renderEmploymentDetails(index))}
              </>
            )}

            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                text={loading ? "Submitting..." : "Submit"}
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CoformTwo;