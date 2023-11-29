import Image from "next/image";
import Avatar from "./../../assets/avatar.jpeg";
import Link from "next/link";

interface Props {
  id: bigint;
  blogTitle: string;
  blogContent: string;
  blogAuthor: string;
}

const BlogCard: React.FC<Props> = (props) => {
  const blogId = Number(props.id);

  return (
    <Link href={`/blog/${blogId}`} className="p-6 max-w-sm">
      <div className="flex rounded-lg h-full bg-transparent border-2 p-4 border-[#86C232] hover:border-white hover:cursor-pointer hover:scale-105 flex-col">
        <h3 className="text-xl md:text-3xl font-semibold md:font-bold">
          {props.blogTitle}
        </h3>
        <p className="text-gray-400 my-4 line-clamp-6">{props.blogContent}</p>
        <div className="flex justify-center w-full">
          <div className="flex flex-row justify-between md:justify-center w-full px-4 py-4 align-middle bg-gray-700 rounded-lg">
            <Image src={Avatar} width={48} height={48} alt="Avatar Image" />
            <p className="text-md ml-6 truncate md:text-lg text-white font-normal md:font-semibold mt-3">
              {props.blogAuthor}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
