import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IUser } from "../../interface/user.interface";
import {
  removeLocalHostData,
  setLocalHostData,
} from "../../utils/getLocalData.util";

interface IProps {
  login?: boolean;
  user?: IUser | null;
}

const Navbar: FC<IProps> = ({ login, user }) => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className="navbar bg-cyan-600 text-white">
          <div className="navbar-start">
            <div className="dropdown ">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content bg-cyan-600 text-white mt-3 p-2 shadow rounded-box w-52"
              >
                <li>
                  {" "}
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Services
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  {" "}
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <svg
              className="fill-current h-8 w-8 mx-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <Link href={"/"}>
              <a className="font-semibold text-xl tracking-tight">
                Patient Management
              </a>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <li>
                {" "}
                <a
                  href="#responsive-header"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  Services
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="#responsive-header"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  About Us
                </a>
              </li>

              <li>
                {" "}
                <a
                  href="#responsive-header"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-end content-center items-center mx-3">
            <div className="avatar placeholder  mx-3 py-0">
              <div className="bg-white text-gray-400 rounded-full w-10">
                <span>
                  {user
                    ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
                    : ""}
                </span>
              </div>
            </div>
            <div>
              {!login ? (
                <Link
                  href="/auth/login"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                  Login
                </Link>
              ) : (
                <button
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:cursor-pointer hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                  onClick={() => {
                    console.log("logout");
                    removeLocalHostData("user");
                    router.push("/auth/login");
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
