import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logoutUser,
  getAllStudents,
  getAllLostItems,
  getAllFoundItems,
  deleteStudent
} from "../../Services/LoginService";
import "./AdminMenu.css";

const AdminMenu = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const [showStudents, setShowStudents] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [stuRes, lostRes, foundRes] = await Promise.all([
          getAllStudents(),
          getAllLostItems(),
          getAllFoundItems()
        ]);

        setStudents(stuRes.data);
        setLostItems(lostRes.data);
        setFoundItems(foundRes.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const handleDeleteStudent = async (username) => {
    if (!window.confirm("Delete this student?")) return;
    await deleteStudent(username);
    setStudents(prev => prev.filter(s => s.username !== username));
  };

  return (
    <div className="admin-page">

      {/* HEADER */}
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-container">

        {/* SYSTEM SUMMARY (NEW – CARD STYLE) */}
        <section className="admin-section">
          <h4>System Summary</h4>

          <div className="action-grid three-column">
            <div className="action-card">
              <h5>Total Students</h5>
              <p className="count-text">
                {loading ? "…" : students.length}
              </p>
            </div>

            <div className="action-card">
              <h5>Lost Items</h5>
              <p className="count-text">
                {loading ? "…" : lostItems.length}
              </p>
            </div>

            <div className="action-card">
              <h5>Found Items</h5>
              <p className="count-text">
                {loading ? "…" : foundItems.length}
              </p>
            </div>
          </div>
        </section>

        {/* MANAGEMENT */}
        <section className="admin-section">
          <h4>Management</h4>

          <div className="action-grid three-column">
            <div
              className="action-card"
              onClick={() => setShowStudents(!showStudents)}
            >
              <h5>Students</h5>
              <p>View and manage student accounts</p>
            </div>

            <div
              className="action-card"
              onClick={() => navigate("/lost-report")}
            >
              <h5>Lost Reports</h5>
              <p>View all lost item reports</p>
            </div>

            <div
              className="action-card"
              onClick={() => navigate("/found-report")}
            >
              <h5>Found Reports</h5>
              <p>View all found item reports</p>
            </div>
          </div>
        </section>

        {/* STUDENT LIST */}
        {showStudents && (
          <section className="admin-section">
            <h4>Student List</h4>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Register No</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => (
                  <tr key={s.username}>
                    <td>{i + 1}</td>
                    <td>{s.personalName}</td>
                    <td>{s.username}</td>
                    <td>{s.email}</td>
                    <td>{s.role}</td>
                    <td>
                      <button
                        className="danger-btn"
                        onClick={() => handleDeleteStudent(s.username)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

      </div>
    </div>
  );
};

export default AdminMenu;
