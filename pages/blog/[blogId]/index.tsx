import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "./../../components/Navbar";
import Avatar from "./../../../assets/avatar.jpeg";
import { usePublicClient, useWalletClient, useAccount } from "wagmi";
import ABI from "../../../utils/abi";
import { toast } from "react-toastify";

interface BlogDetails {
  blogAuthor: string;
  blogTitle: string;
  blogContent: string;
}

// Custom hook for fetching blog details
const useBlogDetails = (blogId: string) => {
  const publicClient = usePublicClient();
  const [blogDetails, setBlogDetails] = useState<BlogDetails>({
    blogAuthor: "",
    blogTitle: "",
    blogContent: "",
  });

  useEffect(() => {
    const getBlogDetailsById = async () => {
      const { result }: any = await publicClient.simulateContract({
        address: "0xCc113c8555879715B51e8b4E3B31377FaF92CE42",
        abi: ABI,
        functionName: "viewPost",
        args: [blogId],
      });

      setBlogDetails({
        blogAuthor: result[1],
        blogTitle: result[2],
        blogContent: result[3],
      });
    };

    getBlogDetailsById();
  }, [publicClient, blogId]);

  return blogDetails;
};

const BlogId = () => {
  const router = useRouter();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  const blogId = router?.query?.blogId as string;
  const { blogAuthor, blogTitle, blogContent } = useBlogDetails(blogId);
  const publicClient = usePublicClient();

  const deleteBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (account === blogAuthor) {
      const data = await publicClient.simulateContract({
        account,
        address: "0xCc113c8555879715B51e8b4E3B31377FaF92CE42",
        abi: ABI,
        functionName: "deletePost",
        args: [blogId],
      });

      if (!walletClient) {
        return;
      }

      const tx = await walletClient.writeContract(data.request);
      const toastId = toast.loading("Deleting Blog...");

      const transaction = await publicClient.waitForTransactionReceipt({
        hash: tx,
      });
      toast.update(toastId, {
        render: "Blog Deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      router.push("/");
    }
  };

  return (
    <div className="bg-[#222629] min-h-screen text-[#86C232] p-8">
      <Navbar />
      <div className="flex justify-between p-4 md:p-16 flex-col gap-8">
        <h3 className="text-xl md:text-3xl font-bold text-center">
          {blogTitle}
        </h3>
        <div className="flex justify-center w-full">
          <div className="flex flex-row justify-between md:justify-center md:gap-8 gap-4 w-full md:w-96 px-4 py-4 align-middle bg-gray-700 rounded-lg">
            <Image src={Avatar} width={48} height={48} alt="Avatar Image" />
            <p className="text-xs text-white font-semibold mt-3 md:text-lg truncate">
              {blogAuthor}
            </p>
          </div>
        </div>
        {account === blogAuthor && (
          <div className="flex justify-center w-full -mt-2">
            <button
              onClick={deleteBlog}
              className="rounded-md px-4 py-3 font-semibold text-lg hover:scale-110 text-white bg-red-500 text-md cursor-pointer "
            >
              Delete Blog
            </button>
          </div>
        )}
        <p className="text-gray-300 text-center md:leading-7 text-md md:text-lg">
          {blogContent}
        </p>
      </div>
    </div>
  );
};

export default BlogId;
