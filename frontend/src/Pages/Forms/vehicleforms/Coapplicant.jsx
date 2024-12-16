
import React from 'react'

export default function Coapplicant() {
  return (
    <div>
      
    </div>
  )
}





// // Parent Component (e.g., App.js or VehicleMain)
// import React, { useState } from 'react';
// import VehicleOne from './VehicleOne';
// import VehicleTwo from './VehicleTwo';
// import VehicleThree from './VehicleThree';
// import VehicleFour from './VehicleFour';

// const Coapplicant = () => {
//     const [numApplicants, setNumApplicants] = useState(1);

//     const handleApplicantChange = (e) => {
//         setNumApplicants(Number(e.target.value));
//     };

//     return (
//         <div>
//             <h1>Vehicle Application</h1>
//             <label>
//                 Number of Applicants:
//                 <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     value={numApplicants}
//                     onChange={handleApplicantChange}
//                 />
//             </label>

//             {/* Render Pages */}
//             <VehicleOne numApplicants={numApplicants} />
//             <VehicleTwo numApplicants={numApplicants} />
//             <VehicleThree numApplicants={numApplicants} />
//             <VehicleFour numApplicants={numApplicants} />
//         </div>
//     );
// };

// export default Coapplicant;