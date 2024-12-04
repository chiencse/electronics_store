import Sidebar from './components/sidebar';

const Layout = ({ children }: any) => {
  return (
    <div className="flex mx-24 border-2 rounded-md shadow-md my-6">
      <Sidebar />
      <main className="mt-6 flex-1">{children}</main>
    </div>
  );
};

export default Layout;
