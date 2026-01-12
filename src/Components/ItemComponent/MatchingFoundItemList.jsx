import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMatchingFoundItems, collectItem } from "../../Services/MatchItemService";

const MatchingFoundItemList = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMatchingFoundItems(id).then(res => setItems(res.data));
  }, [id]);

  const handleCollect = (foundItemId) => {
    collectItem(id, foundItemId).then(() => {
      alert("Item collected successfully");
      navigate("/lost-report");
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center">Matching Found Items</h4>

      <table className="table table-bordered text-center mt-3">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Category</th><th>Color</th>
            <th>Brand</th><th>Location</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.foundItemId}>
              <td>{item.foundItemId}</td>
              <td>{item.foundItemName}</td>
              <td>{item.category}</td>
              <td>{item.color}</td>
              <td>{item.brand}</td>
              <td>{item.location}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleCollect(item.foundItemId)}
                >
                  Collect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchingFoundItemList;
