import Sidebar from './Sidebar';

function PageLayout({
  children,
  filter,
  setFilter,
  total,
  active,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="tm-root">
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        total={total}
        active={active}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <main className="tm-main">{children}</main>
    </div>
  );
}

export default PageLayout;
