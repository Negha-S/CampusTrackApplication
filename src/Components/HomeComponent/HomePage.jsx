import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* HEADER */}
      <header className="home-header fade-in">
        <div className="logo">
          <b>Lost & Found</b>
        </div>
        <nav>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section fade-in">
        <div className="hero-content">
          <h1>
            Recover Lost Items <br />
            <span>Faster & Smarter</span>
          </h1>
          <p>
            A centralized system to report, track, and recover lost and found
            items within the campus.
          </p>

          <div className="hero-actions">
            <button className="lost-btn" onClick={() => navigate("/login")}>
              Report Lost
            </button>
            <button className="found-btn" onClick={() => navigate("/login")}>
              Report Found
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="category-section">
        <h2 className="fade-in">Choose Item Category</h2>
        <p className="fade-in">Report or search items based on category</p>

        <div className="category-grid">
          <div className="category-card card-hover">Electronics</div>
          <div className="category-card card-hover">ID Cards</div>
          <div className="category-card card-hover">Books</div>
          <div className="category-card card-hover">Accessories</div>
          <div className="category-card card-hover">Clothing</div>
          <div className="category-card card-hover">Stationery</div>
        </div>
      </section>

      {/* RECENT REPORTS */}
      <section className="report-section">
        <h2 className="fade-in">Recent Lost & Found Reports</h2>
        <p className="fade-in">Latest updates from users</p>

        <div className="report-grid">
          <div className="report-card card-hover">
            <h4>Lost Wallet</h4>
            <p>Location: Library</p>
            <span className="lost-tag">Lost</span>
          </div>

          <div className="report-card card-hover">
            <h4>Found ID Card</h4>
            <p>Location: CSE Block</p>
            <span className="found-tag">Found</span>
          </div>

          <div className="report-card card-hover">
            <h4>Lost Mobile Phone</h4>
            <p>Location: Bus Stop</p>
            <span className="lost-tag">Lost</span>
          </div>

          <div className="report-card card-hover">
            <h4>Found Keys</h4>
            <p>Location: Parking Area</p>
            <span className="found-tag">Found</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer fade-in">
        <p>© 2025 Lost & Found System. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default HomePage;
