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
    applicants: Array.from({ length: numberOfApplicants }, (_, index) => ({
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

  const handleInputChange = (e, applicantIndex = null) => {
    const { name, value } = e.target;
    if (applicantIndex !== null) {
      setFormValues((prevState) => ({
        ...prevState,
        applicants: prevState.applicants.map((applicant, idx) =>
          idx === applicantIndex ? { ...applicant, [name]: value } : applicant
        ),
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.log(
      `Updated ${name} for applicant ${
        applicantIndex !== null ? applicantIndex : "common"
      }:`,
      value
    );
  };

  const handleOptionSelect = (name, option, applicantIndex = null) => {
    if (applicantIndex !== null) {
      setFormValues((prevState) => ({
        ...prevState,
        applicants: prevState.applicants.map((applicant, idx) =>
          idx === applicantIndex ? { ...applicant, [name]: option } : applicant
        ),
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: option,
      }));
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
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const getNavigationPath = () => {
    const { loan } = formValues;
    const userTypes = formValues.applicants.map(
      (applicant) => applicant.user_type || "Self-Employed"
    );

    const paths = {
      "Home Loan": {
        Salaried: "home&user_type=salaried",
        "Self-Employed": "home&user_type=self_employed",
      },
      "Vehicle Loan": {
        Salaried: "vehicle&user_type=salaried",
        "Self-Employed": "vehicle&user_type=self_employed",
      },
      "Personal Loan": {
        Salaried: "personal&user_type=salaried",
        "Self-Employed": "personal&user_type=self_employed",
      },
      "Business Loan": {
        Salaried: "business&user_type=salaried",
        "Self-Employed": "business&user_type=self_employed",
      },
      "Mortgage Loan": {
        Salaried: "mortgage&user_type=salaried",
        "Self-Employed": "mortgage&user_type=self_employed",
      },
    };

    const queryParams = userTypes
      .map((userType, index) => {
        const param = paths[loan]?.[userType] ?? "";
        return param ? `applicant${index + 1}=${param}` : "";
      })
      .filter(Boolean)
      .join("&");

    console.log("Generated Query Params:", queryParams);
    return queryParams ? `/co-applicant-form-detail-three?${queryParams}` : "#";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not authenticated. Please log in.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const transformedData = {
      userId: user?.id, // Assuming userId comes from previous form or context
      loanType: formValues.loan,
      numberOfApplicants,
      applicants: formValues.applicants.map((applicant) => applicant), // Already in correct format
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
      const result = await dispatch(
        saveLoanApplication(transformedData)
      ).unwrap();
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
          } else {
            toast.error("Invalid navigation path.", {
              position: "top-center",
              autoClose: 2000,
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
    <div key={index} className="mt-8">
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
            onChange={(e) =>
              handleRadioChange("user_type", e.target.value, index)
            }
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
            onChange={(e) =>
              handleRadioChange("user_type", e.target.value, index)
            }
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="ml-3 text-white">Self-Employed / Professional</span>
        </label>
      </div>

      {formValues.applicants[index].user_type === "Salaried" && (
        <div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              placeholder="Organisation Name"
              name="organisation_name"
              value={formValues.applicants[index].organisation_name}
              onChange={(e) => handleInputChange(e, index)}
            />
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
              onSelect={(option) =>
                handleOptionSelect("organisation_type", option, index)
              }
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              placeholder="Experience in Current Organization"
              name="currentOrganizationExperience"
              value={formValues.applicants[index].currentOrganizationExperience}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              placeholder="Experience in Previous Organization"
              name="previousOrganizationExperience"
              value={
                formValues.applicants[index].previousOrganizationExperience
              }
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              placeholder="Designation"
              name="designation_salaried"
              value={formValues.applicants[index].designation_salaried}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              placeholder="Place of Posting"
              name="place_of_posting"
              value={formValues.applicants[index].place_of_posting}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              placeholder="Monthly Salary (in hand)"
              name="monthly_salary"
              value={formValues.applicants[index].monthly_salary}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              placeholder="Bank in which salary account is maintained"
              name="salary_bank_name"
              value={formValues.applicants[index].salary_bank_name}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        </div>
      )}

      {formValues.applicants[index].user_type === "Self-Employed" && (
        <div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              placeholder="Name of Firm/Company"
              name="company_name"
              value={formValues.applicants[index].company_name}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Dropdown
              options={[
                "Company",
                "Partnership Firm",
                "Proprietary Firm",
                "LLP",
                "Others",
              ]}
              placeholder="Type of Firm"
              setOpenDropdown={setOpenDropdown}
              isOpen={openDropdown === `company_type-${index}`}
              id={`company_type-${index}`}
              value={formValues.applicants[index].company_type}
              onSelect={(option) =>
                handleOptionSelect("company_type", option, index)
              }
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              placeholder="Firm Registration / Incorporation Date"
              name="incorporation_date"
              value={formValues.applicants[index].incorporation_date}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Dropdown
              options={[
                "Proprietor",
                "Partner",
                "Founder",
                "Director",
                "Others",
              ]}
              placeholder="Designation"
              setOpenDropdown={setOpenDropdown}
              isOpen={openDropdown === `designation_self-${index}`}
              id={`designation_self-${index}`}
              value={formValues.applicants[index].designation_self}
              onSelect={(option) =>
                handleOptionSelect("designation_self", option, index)
              }
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              placeholder="Years in Line of Business (VINTAGE)"
              name="years_in_business"
              value={formValues.applicants[index].years_in_business}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              placeholder="Years of ITR Filing (VINTAGE)"
              name="years_of_itr_filing"
              value={formValues.applicants[index].years_of_itr_filing}
              onChange={(e) => handleInputChange(e, index)}
            />
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
            <div className="grid grid-cols-2 w-full">
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
            </div>

            {formValues.loan && (
              <>
                {["Home Loan", "Business Loan", "Mortgage Loan"].includes(
                  formValues.loan
                ) && (
                  <>
                    <div className="mt-10">
                      <h2 className="text-xl font-bold text-white mb-4">
                        Property Finalised
                      </h2>
                      <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-2 w-full gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="property_finalised"
                              checked={formValues.property_finalised === "Yes"}
                              value="Yes"
                              onChange={(e) =>
                                handleRadioChange(
                                  "property_finalised",
                                  e.target.value
                                )
                              }
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
                              onChange={(e) =>
                                handleRadioChange(
                                  "property_finalised",
                                  e.target.value
                                )
                              }
                              className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-3 text-white">No</span>
                          </label>
                        </div>
                        {formValues.property_finalised === "Yes" && (
                          <Input
                            placeholder="Property Address (if Yes)"
                            name="property_address"
                            value={formValues.property_address}
                            onChange={handleInputChange}
                          />
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">
                      Agreement/MoU Executed
                    </h2>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="agreement_executed"
                          checked={formValues.agreement_executed === "Yes"}
                          value="Yes"
                          onChange={(e) =>
                            handleRadioChange(
                              "agreement_executed",
                              e.target.value
                            )
                          }
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
                          onChange={(e) =>
                            handleRadioChange(
                              "agreement_executed",
                              e.target.value
                            )
                          }
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
                      </div>
                    )}
                  </>
                )}

                {formValues.loan === "Vehicle Loan" && (
                  <div className="mt-10">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Vehicle Details
                    </h2>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Input
                        placeholder="Make and Model of Vehicle"
                        name="vehicleModel"
                        value={formValues.vehicleModel}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Expected date of delivery of Vehicle"
                        name="expectedDeliveryDate"
                        value={formValues.expectedDeliveryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Input
                        placeholder="Dealer Name"
                        name="dealerName"
                        value={formValues.dealerName}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Dealer City"
                        name="dealerCity"
                        value={formValues.dealerCity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Input
                        placeholder="Price of Vehicle"
                        name="vehiclePrice"
                        value={formValues.vehiclePrice}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                <h2 className="text-xl font-bold text-white mt-6 mb-4">
                  Loan Required
                </h2>
                <div className="grid grid-cols-2 w-full gap-6 mt-6">
                  <Input
                    placeholder="Loan Amount Required (Rs.)"
                    name="loan_amount_required"
                    value={formValues.loan_amount_required}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Enter Your Preferred Banks"
                    name="preferred_banks"
                    value={formValues.preferred_banks}
                    onChange={handleInputChange}
                  />
                </div>

                {formValues.applicants.map((_, index) =>
                  renderEmploymentDetails(index)
                )}
              </>
            )}

            <div>
              <Button type="submit" text="Submit" className="mt-6" />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CoformTwo;
