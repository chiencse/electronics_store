import React from 'react';
import DashboardCards1 from './DashBoardCard1';
import DashboardCards2 from './DashBoardCard2';
import Chart from './Chart';
const AdminPage = () => {
  return (
    <div className="bg-zinc-50">
      <div className="flex flex-col item-centers gap-2 py-4 pl-60 pr-20 min-h-[100vh]">
        <iframe
        
          src="https://open.spotify.com/embed/playlist/3tcCT7XxZStJ2v0nW1AVfO?utm_source=generator"
          width="100%"
          height="160"
         
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
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
        <div className="flex flex-col gap-4">
          <DashboardCards1 />
          <Chart />
          <DashboardCards2 />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
