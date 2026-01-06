import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateLostId, saveLostItem } from "../../Services/LostItemService";

const LostItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [lostItem, setLostItem] = useState({
    lostItemName: "",
    category: "",
    color: "",
    brand: "",
    location: ""
  });

  const [newId, setNewId] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    generateLostId().then(res => setNewId(res.data));
    getUserId().then(res => setUsername(res.data.username));
  }, []);

  const onChangeHandler = (e) => {
    setLostItem({ ...lostItem, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let temp = {};
    let valid = true;

    Object.keys(lostItem).forEach(key => {
      if (!lostItem[key].trim()) {
        temp[key] = "Required";
        valid = false;
      }
    });

    setErrors(temp);
    if (!valid) return;

    saveLostItem({
      lostItemId: newId,
      ...lostItem,
      lostDate,
      username,
      status: false
    }).then(() => {
      alert("Lost Item Submitted");
      navigate("/StudentMenu");
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #fff2cc, #eaffc7)", paddingTop: "40px" }}>
      <div className="container">
        <div className="card p-4 shadow mx-auto" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-4">Lost Item Entry</h3>

          <form>
            <input className="form-control mb-2" value={newId} readOnly />

            {Object.keys(lostItem).map(field => (
              <div key={field} className="mb-2">
                <input
                  className="form-control"
                  placeholder={field.replace(/([A-Z])/g," $1")}
                  name={field}
                  value={lostItem[field]}
                  onChange={onChangeHandler}
                />
                {errors[field] && <small className="text-danger">Required</small>}
              </div>
            ))}

            <input type="date" className="form-control mb-3"
              value={lostDate} onChange={e => setLostDate(e.target.value)} />

            <div className="text-center">
              <button className="btn btn-success me-2" onClick={handleValidation}>Submit</button>
              <button className="btn btn-outline-secondary" onClick={() => navigate("/StudentMenu")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LostItemEntry;
