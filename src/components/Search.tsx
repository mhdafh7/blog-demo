import { ChangeEvent, useState } from "react";
import { Article } from "../App";

type SearchProps = {
  list: Article[];
  setList: React.Dispatch<React.SetStateAction<Article[]>>;
};
const Search = ({ list, setList }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterList = (searchValue: string) => {
    const filteredList = list.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setList(filteredList);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    filterList(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search articles"
        className="bg-white rounded-lg border-2 border-[#E0E0E0] h-14 px-6 py-3 text-sm w-96"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};
export default Search;

// import { useState } from "react";
// import Image from "next/image";
// import styles from "./Search.module.scss";
// const Search = ({ data, setData, title }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const handleChange = (event) => {
//     setSearchQuery(event.target.value);
//     filterData(event.target.value);
//   };

//   const filterData = (searchValue) => {
//     const filteredData = data.filter((item) =>
//       item.title.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setData(filteredData);
//   };
//   return (
//     <>
//       <div className={styles.search}>
//         <span className={styles.icon}>
//           <Image src="/assets/icons/search.svg" alt="search icon" fill />
//         </span>
//         <input
//           type="search"
//           placeholder={`Search ${title}`}
//           onChange={handleChange}
//           value={searchQuery}
//         />
//       </div>
//     </>
//   );
// };
// export default Search;
