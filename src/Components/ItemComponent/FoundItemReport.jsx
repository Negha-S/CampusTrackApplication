import React, { useEffect, useState } from "react";
import { getAllFoundItems } from "../../Services/FoundItemService";
import { useNavigate } from "react-router-dom";

const FoundItemReport = () => {
  const [foundItems, setFoundItems] = useState([]);

  const role = sessionStorage.getItem("role");        // ADMIN / STUDENT
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    getAllFoundItems()
      .then(res => {
        if (role === "ADMIN") {
          // ✅ Admin sees everything
          setFoundItems(res.data);
        } else {
          // ✅ Student sees only own found items
          const filtered = res.data.filter(
            item => item.username === username
          );
          setFoundItems(filtered);
        }
      })
      .catch(err => console.error(err));
  }, [role, username]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fff2cc, #eaffc7)",
        paddingTop: "40px"
      }}
    >
      <div className="container">

        <h3 className="text-center mb-4">
          {role === "ADMIN"
            ? "Admin Found Item List"
            : "Student Found Item List"}
        </h3>

        <div className="card shadow p-3">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Date</th>
                <th>User</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {foundItems.map(item => (
                <tr key={item.foundItemId}>
                  <td>{item.foundItemId}</td>
                  <td>{item.foundItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.foundDate}</td>
                  <td>{item.username}</td>
                  <td>
                    {item.returnedStatus
                      ? <span className="text-success fw-bold">Returned</span>
                      : <span className="text-danger fw-bold">Not Returned</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-success"
            onClick={() => navigate(-1)}
          >
            Return
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoundItemReport;
