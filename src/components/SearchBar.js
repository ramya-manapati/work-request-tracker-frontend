function SearchBar({ onSearch }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search by title or client"
      onChange={e => onSearch(e.target.value)}
    />
  );
}
export default SearchBar;
