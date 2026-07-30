function StatusFilter({ onFilter }) {
  return (
    <select className="filter-select" onChange={e => onFilter(e.target.value)}>
      <option value="">All statuses</option>
      <option value="New">New</option>
      <option value="InProgress">In Progress</option>
      <option value="Blocked">Blocked</option>
      <option value="Completed">Completed</option>
    </select>
  );
}
export default StatusFilter;
