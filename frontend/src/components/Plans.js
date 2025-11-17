// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import "../styles/Plans.css";

// const Plans = () => {
//   const [plans, setPlans] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   useEffect(() => {
//   axios
//     .get("http://localhost:8080/api/plans")
//     .then((res) => {
//       console.log("📦 API Response:", res.data);
//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data?.content
//         ? res.data.content
//         : [];
//       setPlans(data);
//     })
//     .catch((err) => console.error("Error fetching plans:", err));
// }, []);


//   const filteredPlans = plans.filter(
//     (plan) =>
//       plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       plan.planType.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="plans-container">
//       <h2 className="plans-title">Available Mobile Plans</h2>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search plans..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Plans Grid */}
//       <div className="plans-grid">
//         {filteredPlans.map((plan) => (
//           <motion.div
//             key={plan.planId}
//             className="plan-card"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => setSelectedPlan(plan)}
//           >
//             <h3>{plan.planName}</h3>
//             <p><strong>Type:</strong> {plan.planType}</p>
//             <p><strong>Price:</strong> ₹{plan.price}</p>
//             <p><strong>Data:</strong> {plan.dataLimit} GB</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Plan Details Modal */}
//       {selectedPlan && (
//         <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
//           <motion.div
//             className="plan-modal"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2>{selectedPlan.planName}</h2>
//             <p><strong>Type:</strong> {selectedPlan.planType}</p>
//             <p><strong>Price:</strong> ₹{selectedPlan.price}</p>
//             <p><strong>Data Limit:</strong> {selectedPlan.dataLimit} GB</p>
//             <p><strong>Validity:</strong> {selectedPlan.validity} days</p>
//             <p><strong>Description:</strong> {selectedPlan.description}</p>
//             <button className="close-btn" onClick={() => setSelectedPlan(null)}>
//               Close
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Plans;
