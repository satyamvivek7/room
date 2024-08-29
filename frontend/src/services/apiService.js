export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5555/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Network error" };
  }
};

export const submitExpense = async ({ formData, token }) => {
  try {
    const response = await fetch("http://localhost:5555/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage?.getItem("Session-token"),
      },
      body: JSON.stringify({ formData, token }),
    });

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during submit expense:", error);
    return { success: false, message: "Network error" };
  }
};

export const fetchExpense = async () => {
  try {
    const response = await fetch(
      "http://localhost:5555/api/users/transactiondataAcToUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage?.getItem("Session-token"),
        },
        // body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during fetching expense:", error);
    return { success: false, message: "Network error" };
  }
};
