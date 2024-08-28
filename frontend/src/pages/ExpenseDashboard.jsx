import React, { useEffect, useState } from "react";
import "../styles/Dashboard/Dashboard.css";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseDashboard() {
  const [username, setUsername] = useState(null);

  //get username from sessionStorage.
  useEffect(() => {
    const ActiveUser = sessionStorage.getItem("username");
    console.log("username", ActiveUser);
    setUsername(ActiveUser);
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
          {/* <tbody>
            {tableData?.length > 0 &&
              tableData?.map((user, index) => (
                <tr key={index}>
                  <td>{(page - 1) * count + index + 1}</td>
                  <td>{user.user_name}</td>
                  <td>{user.gender}</td>
                  <td>{user.contact_no}</td>
                  <td>{user.email_id}</td>
                  <td>{user.role}</td>
                  <td
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
                  </td>
                </tr>
              ))}
          </tbody> */}
        </table>
      </div>
    </>
  );
}
