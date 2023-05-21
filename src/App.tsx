import { useQuery } from "@tanstack/react-query";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { BarLoader } from "react-spinners";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

export type Article = {
  id: string;
  title: string;
  thumb: string;
  slug: string;
  short_description: string;
};
function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>("");

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["articles"],
    queryFn: () => {
      return fetch(import.meta.env.VITE_PUBLIC_API_URL)
        .then((res) => res.json())
        .catch((err) => console.error(err));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setArticles(data?.data);
      setFilteredArticles(data?.data);
    }
  }, [data, isSuccess]);

  return (
    <>
      {isModalOpen ? (
        <Modal slug={slug} setIsModalOpen={setIsModalOpen} />
      ) : null}
      <div className="bg-[#F8F8F8] min-h-screen w-full">
        <Navbar />
        <div className="flex flex-col items-center gap-[53px] mt-[53px] max-md:mx-4 mx-28">
          <div className="flex w-full justify-between items-center max-md:flex-col max-md:gap-4">
            <h4 className="text-2xl font-semibold">All artices</h4>
            <Search list={articles} setList={setFilteredArticles} />
          </div>
          {/* Article Grid */}
          {isLoading ? (
            <div className="m-auto">
              <BarLoader />
            </div>
          ) : isError ? (
            <h1>Error</h1>
          ) : isSuccess ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full place-items-center pb-10">
              {filteredArticles.map((article: Article) => (
                <Card
                  key={article.id}
                  slug={article.slug}
                  description={article.short_description}
                  title={article.title}
                  image={article.thumb}
                  setIsModalOpen={setIsModalOpen}
                  setSlug={setSlug}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
