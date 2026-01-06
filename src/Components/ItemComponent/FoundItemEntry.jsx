import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateFoundId, saveFoundItem } from "../../Services/FoundItemService";

const FoundItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [foundItem, setFoundItem] = useState({
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: ""
  });

  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    generateFoundId().then(res => setNewId(res.data));
    getUserId().then(res => setUserId(res.data.username));
  }, []);

  const onChangeHandler = (e) => {
    setFoundItem({ ...foundItem, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let temp = {};
    let valid = true;

    Object.keys(foundItem).forEach(key => {
      if (!foundItem[key].trim()) {
        temp[key] = "Required";
        valid = false;
      }
    });

    setErrors(temp);

    if (!valid) return;

    const finalFoundItem = {
      foundItemId: newId,
      ...foundItem,
      foundDate: fdate,
      username: userId,
      status: false,
      returnedStatus: false
    };

    saveFoundItem(finalFoundItem)
      .then(() => {
        alert("Found Item Submitted Successfully");
        navigate("/StudentMenu");
      })
      .catch(() => alert("Save failed"));
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #fff2cc, #eaffc7)", paddingTop: "40px" }}>
      <div className="container">
        <div className="card p-4 shadow mx-auto" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-4">Found Item Entry</h3>

          <form>
            <input className="form-control mb-2" value={newId} readOnly />

            {["foundItemName","category","color","brand","location"].map(field => (
              <div key={field} className="mb-2">
                <input
                  className="form-control"
                  placeholder={field.replace(/([A-Z])/g," $1")}
                  name={field}
                  value={foundItem[field]}
                  onChange={onChangeHandler}
                />
                {errors[field] && <small className="text-danger">Required</small>}
              </div>
            ))}

            <input type="date" className="form-control mb-3"
              value={fdate} onChange={e => setFdate(e.target.value)} />

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

export default FoundItemEntry;
