import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BarLoader } from "react-spinners";

type ModalProps = {
  slug: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type ModalDetail = {
  _id: string;
  title: string;
  cover: string;
  body: string;
};
const Modal = ({ slug, setIsModalOpen }: ModalProps) => {
  const {
    data: blog,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["articles", slug],
    queryFn: () => {
      return fetch(`${import.meta.env.VITE_PUBLIC_DETAIL_API_URL}/${slug}`)
        .then((res) => res.json())
        .catch((err) => console.error(err));
    },
  });
  return (
    <div className="fixed bg-black bg-opacity-40 h-screen w-screen">
        <button
          className="absolute top-[6%] right-[10%] bg-gray-800 hover:bg-gray-500 transition-colors text-white rounded-full w-8 h-8 flex items-center justify-center p-0 m-0 leading-[-10%]"
          onClick={() => setIsModalOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586L3.707 2.293A1 1 0 102.293 3.707L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293a1 1 0 101.414-1.414L11.414 10l6.293-6.293a1 1 0 00-1.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      <div className="overflow-y-auto flex items-center justify-center bg-white w-[80%] h-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl">
        {isLoading ? (
          <BarLoader />
        ) : isError ? (
          <h1 className="text-red-500">Error</h1>
        ) : isSuccess ? (
          <div className="flex flex-col h-full relative">
            <img
              src={`https:${blog?.blog.cover}`}
              alt=""
              className="h-80 w-full object-cover rounded-t-2xl"
            />
            <div className="flex flex-col gap-8 p-10">
              <h1 className="text-2xl font-semibold">{blog?.blog.title}</h1>
              <p
                className="text-gray-500 leading-8"
                dangerouslySetInnerHTML={{__html:blog?.blog.body}}
              ></p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Modal;
