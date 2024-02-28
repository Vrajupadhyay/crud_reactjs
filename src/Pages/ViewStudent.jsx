import { useSelector, useDispatch } from "react-redux";
import HomeLayout from "../Layout/HomeLayout";
import { useEffect } from "react";
import { deleteStudent, getStudent } from "../Redux/Slices/StudentSlice";
import { Link } from "react-router-dom";

function ViewStudent() {
    const studentState = useSelector(state => state.student);
    const { loading, error, data: students } = studentState;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudent());
    }, [dispatch]);

    // delete student by id from API
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            dispatch(deleteStudent(id));
        }
    }


    return (
        <HomeLayout>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Student name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Year
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Student ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4">{student.name}</td>
                                        <td className="px-6 py-4">{student.email}</td>
                                        <td className="px-6 py-4">{student.contact}</td>
                                        <td className="px-6 py-4">{student.department}</td>
                                        <td className="px-6 py-4">{student.year}</td>
                                        <td className="px-6 py-4">{student.studentId}</td>
                                        <td className="px-6 py-4">
                                            <Link to={`/edit/${student.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Edit</Link>
                                            <button onClick={() => handleDelete(student.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}

export default ViewStudent;
