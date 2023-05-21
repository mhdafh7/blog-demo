type CardProps = {
  slug: string;
  title: string;
  image: string;
  description: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
};
const Card = ({
  slug,
  title,
  image,
  description,
  setIsModalOpen,
  setSlug,
}: CardProps) => {
  const handleClick = () => {
    setIsModalOpen(true);
    setSlug(slug);
  };
  return (
    <article
      onClick={handleClick}
      className="cursor-pointer flex flex-col gap-6 rounded-2xl overflow-hidden w-96 h-[364px] text-left border-2 border-[#E0E0E0] hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={image}
        alt="article"
        className="w-full object-cover h-[172px]"
      />
      <h6 className="font-semibold text-xl mx-4 truncate-lines-2">{title}</h6>
      <p className="font-medium text-base mb-4 mx-4 truncate-lines-3 text-[#3F3F3F]">
        {description}
      </p>
    </article>
  );
};
export default Card;
