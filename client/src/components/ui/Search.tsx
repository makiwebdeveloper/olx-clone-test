import { FC } from "react";
import { GoSearch } from "react-icons/go";

interface Props {
  value: string;
  setValue: (value: string) => void;
  onClick: () => void;
  restStyles?: string;
}

const Search: FC<Props> = ({ value, setValue, onClick, restStyles }) => {
  return (
    <div className={`flex items-center ${restStyles}`}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Що ви хочете знайти?"
        className="w-full px-4 md:px-6 py-3 md:text-lg rounded-l-md outline-none"
      />
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-r-md border-l text-teal-900 bg-white transition hover:bg-teal-900 hover:text-white"
      >
        <span className="md:text-lg">Пошук</span>{" "}
        <GoSearch className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Search;
