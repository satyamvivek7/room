import React, { useEffect, useState } from "react";
import "../styles/Dashboard/Dashboard.css";
import ExpenseForm from "./ExpenseForm";
import { fetchExpense } from "../services/apiService";

export default function ExpenseDashboard() {
  const [username, setUsername] = useState(null);
  const [expenseList, setExpenseList] = useState(null);

  //get username from sessionStorage.
  useEffect(() => {
    const ActiveUser = sessionStorage.getItem("username");
    console.log("username", ActiveUser);
    setUsername(ActiveUser);
  }, []);

  // useEffect(() => {
  //   const data = await fetchExpense();
  //   setExpenseList(data);
  //   // console.log("fetch", expenseList);
  // }, []);

  useEffect(() => {
    const GetExpense = async () => {
      try {
        const response = await fetchExpense();
        console.log("Get expense list", response);
        setExpenseList(response.data);
        console.log("expense", expenseList);
      } catch (err) {
        console.error("error", err.message);
        // setError("An error occurred");
      }
    };

    GetExpense();
  }, []);

  return (
    <>
      <div className="displayHeading">
        <h2>Expense Traker</h2>
        <h1 className="user-name">Hi🖐 {username}</h1>
      </div>

      {/* button to create expense */}

      <div className="Expense-table">
        {/* expense component */}
        <ExpenseForm />

        <table>
          <thead>
            <tr>
              {/* <th>Serial No</th> */}
              <th>Serial No.</th>
              <th>UserName</th>
              <th>Gender</th>
              <th>Mobile No</th>
              <th>Email ID</th>
              <th>Authorization</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenseList?.length > 0 &&
              expenseList?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.payAmount}</td>
                  <td>{user.category}</td>
                  <td>{user.description}</td>
                  {/* <td>{user.email_id}</td> */}
                  {/* <td>{user.role}</td> */}
                  {/* <td
                    className={`${
                      user.status === "ACTIVE"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => {
                        navigate("/configuration/user/edit");
                        setParameter(user.id);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                    >
                      Edit
                    </a>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
