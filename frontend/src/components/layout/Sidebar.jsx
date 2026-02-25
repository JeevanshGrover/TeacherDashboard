import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold text-purple-600 mb-10">
          SAVRA
        </h1>

        <nav className="space-y-4">
          <NavLink to="/" className="block text-gray-600 hover:text-purple-600">
            Dashboard
          </NavLink>
          <NavLink to="/teachers" className="block text-gray-600 hover:text-purple-600">
            Teachers
          </NavLink>
          <NavLink to="/classrooms" className="block text-gray-600 hover:text-purple-600">
            Classrooms
          </NavLink>
          <NavLink to="/reports" className="block text-gray-600 hover:text-purple-600">
            Reports
          </NavLink>
        </nav>
      </div>

      <div className="text-sm text-gray-500">
        School Admin <br />
        Shauryaman Ray
      </div>
    </div>
  );
}