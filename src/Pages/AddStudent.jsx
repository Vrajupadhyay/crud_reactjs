import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../Redux/Slices/StudentSlice";

function AddStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    year: "",
    studentId: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  }

  // id convert into number
  studentData.id = parseInt(studentData.id);

  const handleSubmit = (e) => {
    if (!studentData.name) {
      alert("Please fill Name field");
      return;
    }
    e.preventDefault();
    dispatch(addStudent(studentData));
    navigate("/view");
  }


  return (
    <>
      <HomeLayout>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add Student
          </h1>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name.."
              className="input input-bordered mt-1"
              name="name"
              id="name"
              value={studentData.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email.."
              className="input input-bordered mt-1"
              name="email"
              id="email"
              value={studentData.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Contact</span>
            </label>
            <input
              type="text"
              placeholder="Enter your contact.."
              className="input input-bordered mt-1"
              name="contact"
              id="contact"
              value={studentData.contact}
              onChange={handleUserInput}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <input
              type="text"
              placeholder="Enter your department.."
              className="input input-bordered mt-1"
              name="department"
              id="department"
              value={studentData.department}
              onChange={handleUserInput}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Year</span>
            </label>
            <input
              type="text"
              placeholder="Enter your year.."
              className="input input-bordered mt-1"
              name="year"
              id="year"
              value={studentData.year}
              onChange={handleUserInput}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Student ID</span>
            </label>
            <input
              type="text"
              placeholder="Enter your student ID.."
              className="input input-bordered mt-1"
              name="studentId"
              id="studentId"
              value={studentData.studentId}
              onChange={handleUserInput}
            />
            {/* submit */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add Student
            </button>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default AddStudent;
