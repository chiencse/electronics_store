import React from 'react';
import DashboardCards1 from './DashBoardCard1';
import Chart from './Chart';  
const AdminPage = () => {
  return (
    <div className="bg-zinc-50">
      <div className="flex flex-col item-centers gap-2 py-4 px-40 min-h-[100vh]">
        {/* Side and Breadcumps */}
        <div className="  flex flex-row items-baseline justify-center ">
          <div className="flex-grow font-semibold">Dashboard</div>
          <div className=" breadcrumbs max-w-xs text-sm text-gray-600">
            <ul>
              <li>
                <a href="/admin">Home</a>
              </li>
              <li>
                <a href="/admin">Admin</a>
              </li>
              <li>Dashboard</li>
            </ul>
          </div>
        </div>
        {/* Main Content */}
        <div className='flex flex-col gap-4'>
        <DashboardCards1/>
        <Chart />
        </div>
       
      </div>
    </div>
  );
};

export default AdminPage;
