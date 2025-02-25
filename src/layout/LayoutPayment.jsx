import SidebarPagos from "./sidebarPagos";
import HederPagos from "./hederPagos";

export default function LayoutPayment({ children }) { 
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarPagos />

      {/* Main Container */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <HederPagos />

        {/* Main Content */}
        <div className="bg-white rounded-xl p-8 shadow-lg flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

