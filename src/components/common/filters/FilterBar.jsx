import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";
import ResetFilter from "./ResetFilter";

function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  onReset,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        lg:flex-row
        lg:items-center
        gap-3
        ${className}
      `}
    >
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="lg:max-w-xs"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {filters.map((filter) => (
          <FilterSelect
            key={filter.label}
            label={filter.label}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
          />
        ))}
      </div>

      <ResetFilter onClick={onReset} />
    </div>
  );
}

export default FilterBar;
