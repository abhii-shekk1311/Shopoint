import type { ChangeEvent } from "react";
import searchIcon from "../../assets/icons/search.png";

type SearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  inputClassName?: string;
  ariaLabel?: string;
};

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search products...",
  disabled = false,
  loading = false,
  className = "",
  inputClassName = "",
  ariaLabel = "Search",
}: SearchInputProps) => {
  const handleClear = () => {
    if (onClear) onClear();
    onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      className={`bg-light-gray rounded-md flex items-center justify-between px-2 ${className}`}
    >
      <div className="flex items-center w-full">
        <img src={searchIcon} alt="Search" width={20} height={20} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => e.key === "Escape" && handleClear()}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          className={`search-input w-full ${inputClassName}`}
        />
      </div>

      <div>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
        {loading && <span role="status" aria-label="Loading" />}
      </div>
    </div>
  );
};

export default SearchInput;
