import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, getUserId } from "../../Services/LoginService";
import "./StudentMenu.css";

const StudentMenu = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getUserId()
      .then((res) => setStudent(res.data))
      .catch(() => console.error("Failed to fetch student"));
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className="student-page">

      {/* HEADER */}
      <header className="student-header">
        <h2>Student Dashboard</h2>

        <div className="header-actions">
          <button
            className="profile-btn"
            onClick={() => setShowProfile(!showProfile)}
          >
            Profile
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="student-container">

        {/* PROFILE SECTION */}
        {showProfile && student && (
          <section className="profile-section">
            <h4>Profile Information</h4>

            <div className="profile-grid">
              <div>
                <label>Name</label>
                <p>{student.personalName}</p>
              </div>

              <div>
                <label>Register Number</label>
                <p>{student.username}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{student.email}</p>
              </div>

              <div>
                <label>Role</label>
                <p className="role-badge">{student.role}</p>
              </div>
            </div>
          </section>
        )}

        {/* ACTIONS */}
        <section className="action-section">
          <h4>Actions</h4>

          {/* Row 1 */}
          <div className="action-grid two-column">
            <div
              className="action-card"
              onClick={() => navigate("/lost-entry")}
            >
              <h5>Report Lost Item</h5>
              <p>Submit details of a lost item</p>
            </div>

            <div
              className="action-card"
              onClick={() => navigate("/found-entry")}
            >
              <h5>Report Found Item</h5>
              <p>Submit details of a found item</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="action-grid two-column section-gap">
            <div
              className="action-card"
              onClick={() => navigate("/lost-report")}
            >
              <h5>View Lost Reports</h5>
              <p>View your lost item reports</p>
            </div>

            <div
              className="action-card"
              onClick={() => navigate("/found-report")}
            >
              <h5>View Found Reports</h5>
              <p>View your found item reports</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="action-grid single-column section-gap">
            <div
              className="action-card"
              onClick={() => navigate("/chat")}
            >
              <h5>Chat</h5>
              <p>Communicate with users</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default StudentMenu;
