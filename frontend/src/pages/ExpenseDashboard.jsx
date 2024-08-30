import React, { useEffect, useState } from "react";
import "../styles/Dashboard/Dashboard.css";
import ExpenseForm from "./ExpenseForm";
import { fetchExpense } from "../services/apiService";
import EditExpense from "./EditExpense";

export default function ExpenseDashboard() {
  const [username, setUsername] = useState(null);
  const [expenseList, setExpenseList] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  //get username from sessionStorage.
  useEffect(() => {
    const ActiveUser = sessionStorage.getItem("username");
    console.log("username", ActiveUser);
    setUsername(ActiveUser);
  }, []);

  useEffect(() => {
    const GetExpense = async () => {
      try {
        const response = await fetchExpense();
        console.log("Get expense list", response);
        setExpenseList(response.data);
        // console.log("expense", expenseList);
      } catch (err) {
        console.error("error", err.message);
        // setError("An error occurred");
      }
    };

    GetExpense();
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenseList((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleEditClick = (id) => {
    setSelectedExpenseId(id);
  };

  const handleExpenseUpdate = (updatedExpense) => {
    setExpenseList((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    );
    setSelectedExpenseId(null); // Close the edit form after update
  };

  return (
    <>
      <div className="displayHeading">
        <h2>Expense Traker</h2>
        <h1 className="user-name">Hi🖐 {username}</h1>
      </div>

      {/* button to create expense */}

      <div className="Expense-table">
        {/* expense component */}
        <ExpenseForm onAddExpense={handleAddExpense} />

        <table>
          <thead>
            <tr>
              {/* <th>Serial No</th> */}
              <th>Serial No.</th>
              <th>Amount ₹</th>
              <th>Category</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Update Date</th>
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
                  <td>{user.createddt}</td>
                  <td>{user.updateddt}</td>

                  <td>
                    {/* <EditExpense /> */}
                    <button
                      onClick={() => handleEditClick(user._id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Show EditExpense form if an expense is selected for editing */}
        {selectedExpenseId && (
          <EditExpense
            expenseId={selectedExpenseId}
            onUpdate={handleExpenseUpdate}
            onCancel={() => setSelectedExpenseId(null)}
          />
        )}
      </div>
    </>
  );
}
