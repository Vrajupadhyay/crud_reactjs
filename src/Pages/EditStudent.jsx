import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeLayout from '../Layout/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStudentById, updateStudent } from '../Redux/Slices/StudentSlice';

function EditStudent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the id parameter from the URL

    const initialStudentState = {
        name: "",
        email: "",
        contact: "",
        department: "",
        year: "",
        studentId: ""
    };

    const [studentData, setStudentData] = useState(initialStudentState);

    useEffect(() => {
        dispatch(getStudentById(id)); // Dispatch getStudentById action
    }, [dispatch, id]);

    const student = useSelector((state) => state.student.data); // Get the student from the store

    useEffect(() => {
        if (student) {
            setStudentData(student);
        }
    }, [student]);
    
    function handleUserInput(e) {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStudent({ id, data: studentData })); // Dispatch updateStudent action with correct payload
        navigate('/view');
    }

    return (
        <HomeLayout>
            <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Edit Student</h1>
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
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Update Student
                </button>
            </div>
        </HomeLayout>
    );
}

export default EditStudent;
