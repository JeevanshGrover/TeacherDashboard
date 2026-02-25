import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; 

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>

    </div>
  );
}

export default DashboardLayout