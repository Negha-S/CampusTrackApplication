import React, { useEffect, useState } from "react";
import { getAllLostItems } from "../../Services/LostItemService";
import { useNavigate } from "react-router-dom";

const LostItemReport = () => {
  const [lostItems, setLostItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLostItems().then(res => setLostItems(res.data));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #fff2cc, #eaffc7)", paddingTop: "40px" }}>
      <div className="container">
        <h3 className="text-center mb-4">Lost Item Report</h3>

        <div className="card shadow p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Category</th><th>Color</th>
                <th>Brand</th><th>Location</th><th>Date</th><th>User</th>
              </tr>
            </thead>
            <tbody>
              {lostItems.map(item => (
                <tr key={item.lostItemId}>
                  <td>{item.lostItemId}</td>
                  <td>{item.lostItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.lostDate}</td>
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

export default LostItemReport;
