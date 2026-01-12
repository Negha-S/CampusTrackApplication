import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLostItems } from "../../Services/LostItemService";
import { getMatchingFoundItems, collectItem } from "../../Services/MatchItemService";

const LostItemReport = () => {
  const [lostItems, setLostItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [selectedLostId, setSelectedLostId] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const role = sessionStorage.getItem("role"); // ADMIN / STUDENT
  const navigate = useNavigate();

  /* ==============================
     LOAD LOST ITEMS (ROLE BASED)
  =============================== */
  const loadLostItems = useCallback(() => {
    getAllLostItems().then(res => {
      if (role === "STUDENT") {
        // STUDENT → show only NOT FOUND items
        setLostItems(res.data.filter(item => item.status === false));
      } else {
        // ADMIN → show all
        setLostItems(res.data);
      }
    });
  }, [role]);

  useEffect(() => {
    loadLostItems();
  }, [loadLostItems]);

  /* ==============================
     STUDENT ACTIONS
  =============================== */

  const handleSearch = (lostItemId) => {
    setSelectedLostId(lostItemId);
    setSearchClicked(true);
    getMatchingFoundItems(lostItemId)
      .then(res => setMatchedItems(res.data));
  };

  const handleCollect = (foundItemId) => {
    collectItem(selectedLostId, foundItemId).then(() => {
      alert("Item collected successfully");
      setMatchedItems([]);
      setSelectedLostId(null);
      setSearchClicked(false);
      loadLostItems();
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #fff2cc, #eaffc7)",
      paddingTop: "40px"
    }}>
      <div className="container">

        {/* TITLE */}
        <h3 className="text-center mb-4">
          {role === "ADMIN" ? "Admin Lost Item List" : "Student Lost Item List"}
        </h3>

        {/* LOST ITEM TABLE */}
        <div className="card shadow p-3 mb-4">
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
                <th>Status</th>
                {role === "STUDENT" && <th>Search</th>}
              </tr>
            </thead>

            <tbody>
              {lostItems.length === 0 ? (
                <tr>
                  <td colSpan={role === "STUDENT" ? 9 : 8}>
                    <b>No Lost Items Found</b>
                  </td>
                </tr>
              ) : (
                lostItems.map(item => (
                  <tr key={item.lostItemId}>
                    <td>{item.lostItemId}</td>
                    <td>{item.lostItemName}</td>
                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>{item.brand}</td>
                    <td>{item.location}</td>
                    <td>{item.lostDate}</td>
                    <td>
                      <span className={`fw-bold ${item.status ? "text-success" : "text-danger"}`}>
                        {item.status ? "Found" : "Not Found"}
                      </span>
                    </td>

                    {role === "STUDENT" && (
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleSearch(item.lostItemId)}
                        >
                          Search
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MATCHING FOUND ITEMS */}
        {role === "STUDENT" && searchClicked && (
          <>
            <h4 className="text-center mb-3">
              Probable Matching Found Item List
            </h4>

            <div className="card shadow p-3 mb-4">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Color</th>
                    <th>Brand</th>
                    <th>Location</th>
                    <th>Found Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {matchedItems.length === 0 ? (
                    <tr>
                      <td colSpan="8">
                        <b className="text-danger">
                          No similar matches available
                        </b>
                      </td>
                    </tr>
                  ) : (
                    matchedItems.map(item => (
                      <tr key={item.foundItemId}>
                        <td>{item.foundItemId}</td>
                        <td>{item.foundItemName}</td>
                        <td>{item.category}</td>
                        <td>{item.color}</td>
                        <td>{item.brand}</td>
                        <td>{item.location}</td>
                        <td>{item.foundDate}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleCollect(item.foundItemId)}
                          >
                            Collect
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* RETURN BUTTON */}
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={() => navigate(-1)}>
            Return
          </button>
        </div>

      </div>
    </div>
  );
};

export default LostItemReport;
