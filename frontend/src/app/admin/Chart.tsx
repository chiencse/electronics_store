'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Line,
  Pie,
  Cell,
  Area,
} from 'recharts';

// Dynamically import the chart components to prevent SSR issues
const AreaChart = dynamic(
  () => import('recharts').then((mod) => mod.AreaChart),
  { ssr: false }
);
const PieChart = dynamic(() => import('recharts').then((mod) => mod.PieChart), {
  ssr: false,
});

interface LineData {
  name: string;
  Revenue: number;
  Orders: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

const AdminPage: React.FC = () => {
  // Sample data for the line chart
  const lineData: LineData[] = [
    { name: 'January', Revenue: 30, Orders: 8 },
    { name: 'February', Revenue: 50, Orders: 12 },
    { name: 'March', Revenue: 40, Orders: 10 },
    { name: 'April', Revenue: 70, Orders: 15 },
    { name: 'May', Revenue: 60, Orders: 14 },
    { name: 'June', Revenue: 55, Orders: 13 },
    { name: 'July', Revenue: 80, Orders: 18 },
    { name: 'August', Revenue: 75, Orders: 17 },
    { name: 'September', Revenue: 65, Orders: 14 },
    { name: 'October', Revenue: 90, Orders: 20 },
    { name: 'November', Revenue: 85, Orders: 19 },
    { name: 'December', Revenue: 95, Orders: 22 },
  ];

  const pieData = [
    { name: 'Grocery', value: 48.63, color: '#82ca9d' },
    { name: 'Electronics', value: 36.08, color: '#8884d8' },
    { name: 'Other', value: 23.41, color: '#ffc658' },
  ];

  const tableData = [
    {
      category: 'Grocery',
      orders: '187,232',
      perc: '48.63%',
      change: '2.5% Up',
      changeColor: 'text-green-500 bg-green-100',
    },
    {
      category: 'Electronics',
      orders: '126,874',
      perc: '36.08%',
      change: '8.5% Up',
      changeColor: 'text-green-500 bg-green-100',
    },
    {
      category: 'Other',
      orders: '90,127',
      perc: '23.41%',
      change: '10.98% Down',
      changeColor: 'text-red-500 bg-red-100',
    },
  ];
  return (
    <div className="">
      <div className="grid grid-cols-1  lg:grid-cols-12 gap-8">
        {/* Line Chart */}
        <div className="lg:col-span-8 bg-white shadow rounded-lg">
          <div className="p-2 h-14  flex flex-row items-center justify-center border-b-2">
            <h2 className=" flex-grow ml-2   text-lg font-bold text-gray-600 ">
              Overview
            </h2>
            <div role="tablist " className="tabs tabs-boxed ">
              <a role="tab" className="tab ">
                Week
              </a>
              <a role="tab" className="tab tab-active">
                Month
              </a>
              <a role="tab" className="tab">
                Year
              </a>
            </div>
          </div>

          <div className=" p-6">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={lineData}
                margin={{
                  top: 0,
                  right: 40,
                  bottom: 0,
                  left: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="ordersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" type="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="Orders"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  fill="url(#ordersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-4 bg-white  shadow rounded-lg">
        <div className="p-2 h-14  flex flex-row items-center justify-start border-b-2">
          <h2 className="text-lg text-gray-800 font-bold ml-2 ">
            Sales by Category
          </h2>
          </div>
          <div className='p-4'>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="">
                      Category
                    </th>
                    <th scope="col" className="">
                      Orders
                    </th>
                    <th scope="col" className="">
                      Perc.
                    </th>
                    <th scope="col" className="">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="bg-white ">
                      <td className=" font-medium text-gray-900">
                        {row.category}
                      </td>
                      <td className="">{row.orders}</td>
                      <td className="">{row.perc}</td>
                      <td className="">
                        <span
                          className={`badge rounded-lg text-xs font-semibold ${row.changeColor}`}
                        >
                          {row.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminPage;
