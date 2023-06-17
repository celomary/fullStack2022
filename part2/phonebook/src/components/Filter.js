const Filter = ({ setFilterByName, filterByName }) => {
  const handleInputFilterChange = (e) => {
    setFilterByName(e.target.value);
  };

  return (
    <div>
      <p>
        filter shown with
        <input
          type="text"
          value={filterByName}
          onChange={handleInputFilterChange}
        />
      </p>
    </div>
  );
};

export default Filter;
