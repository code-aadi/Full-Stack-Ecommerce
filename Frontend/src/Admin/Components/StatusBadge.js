
  const getStatusBadge = (status) => {
    if (!status) {
    return { bg: "#f3f4f6", color: "#4b5563" }; 
  }

  const cleanStatus = status.trim().toLowerCase();

  if (cleanStatus === "delivered") {
    return { bg: "#dcfce7", color: "#16a34a" }; 
  } 
  else if (cleanStatus === "shipped") {
    return { bg: "#e0f2fe", color: "#0284c7" }; 
  } 
  else if (cleanStatus === "confirmed") {
    return { bg: "#e0e7ff", color: "#4338ca" }; 
  } 
  else if (cleanStatus === "pending") {
    return { bg: "#fef3c7", color: "#d97706" }; 
  } 
  else if (cleanStatus === "cancelled") {
    return { bg: "#fee2e2", color: "#dc2626" }; 
  } 
  else {
    return { bg: "#f3f4f6", color: "#4b5563" }; 
  }
  };

  export default getStatusBadge