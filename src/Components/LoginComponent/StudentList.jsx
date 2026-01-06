import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9595/lostfound/auth/students", {
      withCredentials: true
    }).then(res => setStudents(res.data));
  }, []);

  const deleteStudent = (username) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(
        `http://localhost:9595/lostfound/auth/student/${username}`,
        { withCredentials: true }
      ).then(() => {
        setStudents(students.filter(s => s.username !== username));
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#fdecea", minHeight: "100vh", paddingTop: "40px" }}>
      <div className="container text-center">

        <h2 style={{ color: "#b30059", fontWeight: "700" }}>
          <u>Student List</u>
        </h2>

        <div className="mt-4 p-3 mx-auto shadow"
             style={{ backgroundColor: "white", borderRadius: "12px", maxWidth: "900px" }}>

          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#f8d7da" }}>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.username}>
                  <td>{s.username}</td>
                  <td>{s.personalName}</td>
                  <td>{s.email}</td>
                  <td>{s.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteStudent(s.username)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <button
          className="btn btn-success mt-4"
          onClick={() => navigate("/AdminMenu")}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default StudentList;
