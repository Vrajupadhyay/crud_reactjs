import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../Layout/HomeLayout";
import { getStudent } from "../Redux/Slices/StudentSlice";
import { useEffect } from "react";

function HomePage() {

  // get count of students from api
  const studentState = useSelector(state => state.student);
    const { data: students } = studentState;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudent());
    }, [dispatch]);

    const studentCount = students.length;

  return (
    <HomeLayout>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Welcome to the Admin Dashboard. You can add, view, and delete students from here.
      </p>
      <div className="grid gap-6 mt-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Students
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-white">
              {studentCount}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
