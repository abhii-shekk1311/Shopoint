import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useHeader = () => {
  const [search, setSearch] = useState<string>("");
  // const debouncedSearch = useDebounce(search.trim(), 300);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentSearch = searchParams.get("q") || "";

  // update the box when the search changes from outside (back button, clear filters)
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams);
    console.log({ params }, searchParams.get("q"));
    setSearch("");
    params.delete("q");
    navigate(`/?${params.toString()}`);
  };

  const handleSearch = () => {
    // keep the other filters if we are already on the listing page
    const params =
      location.pathname === "/"
        ? new URLSearchParams(searchParams)
        : new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    else params.delete("q");
    params.delete("page");
    navigate(`/?${params.toString()}`);
  };

  useEffect(() => {
    if (!search) return;
    handleSearch();
  }, [search]);

  return {
    search,
    handleSearchChange,
    handleClearSearch,
  };
};

export default useHeader;
