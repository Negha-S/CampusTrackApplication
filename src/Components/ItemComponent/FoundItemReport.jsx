import React, { useEffect, useState } from "react";
import { getAllFoundItems } from "../../Services/FoundItemService";
import { useNavigate } from "react-router-dom";

const FoundItemReport = () => {
  const [foundItems, setFoundItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllFoundItems().then(res => setFoundItems(res.data));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #fff2cc, #eaffc7)", paddingTop: "40px" }}>
      <div className="container">
        <h3 className="text-center mb-4">Found Item Report</h3>

        <div className="card shadow p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Category</th><th>Color</th>
                <th>Brand</th><th>Location</th><th>Date</th><th>User</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default FoundItemReport;
