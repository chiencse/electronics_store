import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className=" mx-4 w-64 my-6 bg-blue-400 text-white h-[32rem] rounded-md">
      <nav className="my-4">
        <ul className="space-y-4 px-4">
          <li>
            <Link
              href="/user"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Your Account
            </Link>
          </li>
          <li>
            <Link
              href="/user/history"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              History of purchasing
            </Link>
          </li>
          <li>
            <Link
              href="/user/change-password"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Change password
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
