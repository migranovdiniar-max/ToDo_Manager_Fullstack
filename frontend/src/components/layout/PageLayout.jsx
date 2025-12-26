import Sidebar from './Sidebar';

function PageLayout({ children, filter, setFilter, total, active }) {
  return (
    <div className="tm-root">
      <Sidebar filter={filter} setFilter={setFilter} total={total} active={active} />
      <main className="tm-main">{children}</main>
    </div>
  );
}

export default PageLayout;
