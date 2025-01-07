
import React from "react";
import ProductTable from "./ProductTable";
const Page = () => {
  return (
    <div className="bg-zinc-50">
      <div className="flex flex-col item-centers gap-2 py-4 pl-60 pr-20 min-h-[100vh]">
        {/* Side and Breadcumps */}
        <div className="  flex flex-row items-baseline justify-center ">
          <div className="flex-grow font-semibold">Product</div>
          <div className=" breadcrumbs max-w-xs text-sm text-gray-600">
            <ul>
              <li>
                <a href="/admin">Home</a>
              </li>
              <li>
                <a href="/admin">Admin</a>
              </li>
              <li>Product</li>
            </ul>
          </div>
        </div>
        {/* Main Content */}
       <ProductTable />
        
       
      </div>
    </div>
  );
};

export default Page;