import React, { useState } from "react";
import "../styles/Dashboard/ExpenseForm.css";
import { submitExpense } from "../services/apiService";

const ExpenseForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    payAmount: "",
    category: "",
    description: "",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to handle form submission, e.g., sending data to a server.
    try {
      const response = await submitExpense(formData);
      console.log("response", response);
    } catch (err) {
      console.error("error", err.message);
    }

    setShowForm(false); // Close the form after submission
  };

  return (
    <div>
      <button className="createExpenseBtn" onClick={toggleForm}>
        Add Expense
      </button>

      {showForm && (
        <div className="popup-form-container">
          <div className="popup-form">
            <span className="close-button" onClick={toggleForm}>
              &times;
            </span>
            <h2>Expense Form</h2>
            <form onSubmit={handleSubmit}>
              <label>Pay Amount (INRS):</label>
              <input
                type="number"
                name="payAmount"
                min={0}
                value={formData.payAmount}
                onChange={handleChange}
                required
              />
              <label>Category:</label>
              {/* <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              /> */}
              <select
                name="category"
                aria-placeholder="Category List"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
              </select>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;
