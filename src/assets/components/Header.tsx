import iconHamburger from "../images/icon-menu-hamburger.svg";
import iconSearch from "../images/icon-search.svg";
import iconAdd from "../images/icon-add.svg";
import avatar from "../images/image-avatar.webp";

type headerProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onOpenAdd: () => void;
};
export default function Header({
  setIsMenuOpen,
  searchValue,
  setSearchValue,
  onOpenAdd,
}: headerProps) {
  return (
    <section className="flex gap-2.5 px-4 py-3 dark:bg-teal-950 justify-between sm:px-8 ">
      <div className="flex flex-1 gap-2.5 sm:max-w-1/2 ">
        <button
          aria-label="Toggle Menu"
          className="p-2.5 border border-teal-600 rounded-lg cursor-pointer lg:hidden"
          onClick={() => setIsMenuOpen((prevMode) => !prevMode)}
        >
          <img src={iconHamburger} alt="" className="dark:invert" />
        </button>
        <div className="flex flex-1 gap-2 px-3 items-center border border-teal-600 rounded-lg dark:bg-teal-900">
          <img src={iconSearch} alt="search icon" className="w-4 dark:invert" />
          <input
            type="text"
            placeholder="Search by title....."
            className=" text-preset-4-medium outline-none cursor-pointer w-full dark:placeholder-neutral-100 dark:text-neutral-100 "
            value={searchValue}
            onChange={(event) => setSearchValue(event?.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2.5">
        <button
          aria-label="add bookmark"
          className="flex items-center bg-teal-800 rounded-lg p-2.5 border-2 border-teal-600 gap-2 "
          onClick={onOpenAdd}
        >
          <img src={iconAdd} alt="" className="invert w-4.5 self-center" />
          <p className="text-neutral-100 text-preset-3 hidden sm:block">
            Add Bookmark
          </p>
        </button>
        <img src={avatar} alt="avatar" className="w-10" />
      </div>
    </section>
  );
}
