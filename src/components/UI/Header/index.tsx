import type { ChangeEvent } from "react";
import menuIcon from "../../../assets/icons/menu.png";
import cartIcon from "../../../assets/icons/shopping-cart.png";
import userIcon from "../../../assets/icons/user.png";
import SearchInput from "../../Atomic/SearchInput";
import useHeader from "./view/useHeader";
const Header = ({ onSidebarToggle }: { onSidebarToggle: () => void }) => {
  const { search, handleSearchChange, handleClearSearch } = useHeader();

  return (
    <header className="header bg-secondary sticky top-0 z-50 py-4 shadow-md">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center justify-between">
        {/* Hamburger */}
        <div className="flex items-center gap-2 md:gap-4 text-icon">
          <button className="cursor-pointer shrink-0" onClick={onSidebarToggle}>
            <img src={menuIcon} alt="hamburger" height={40} width={40} />
          </button>

          {/* Logo */}
          <div className="text-2xl">
            <h1>Shopoint</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <SearchInput
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e)
            }
            onClear={handleClearSearch}
            placeholder="Search products..."
            className="lg:w-150"
          />
        </div>

        <div className="hidden md:flex items-center text-icon gap-8">
          <img src={cartIcon} alt="hamburger" height={40} width={40} />
          <img src={userIcon} alt="hamburger" height={40} width={40} />
        </div>
      </div>
    </header>
  );
};

export default Header;
