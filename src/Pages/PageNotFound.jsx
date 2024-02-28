import { Link } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

export default function PageNotFound() {
  return (
    <HomeLayout>
      <main className="grid min-h-full place-items-center bg-base-200 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-blue-200">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-blue-200">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              Go back home
            </Link>
            {/* <Link to="/contact" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50">
              Contact support
            </Link> */}
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}
