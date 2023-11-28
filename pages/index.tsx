import Link from "next/link";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePublicClient, useAccount } from "wagmi";
import ABI from "../utils/abi";
import { useRouter } from "next/navigation";
import BlogCard from "./components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const publicClient = usePublicClient();
  const { address: account } = useAccount();
  const router = useRouter();

  const getAllBlogs = async () => {
    const { result }: any = await publicClient.simulateContract({
      address: "0xCc113c8555879715B51e8b4E3B31377FaF92CE42",
      abi: ABI,
      functionName: "viewAllPosts",
      account,
      args: [],
    });
    await setBlogs(result);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="bg-[#222629] h-fit min-h-screen text-white overflow-x-hidden">
      <main className="p-1 md:p-4">
        <header className="flex flex-col md:flex-row justify-between my-8 md:px-12 px-8">
          <Navbar />
          <div className="flex gap-6 md:gap-8 justify-center mt-6 md:mt-0">
            <button
              className="rounded border-2 px-2 md:px-4 py-1.5 border-[#86C232] text-md cursor-pointer hover:bg-[#86C232] hover:border-white md:hover:scale-125"
              onClick={() => router.push("/create")}
            >
              Create Blog
            </button>
            <div className="md:hover:scale-125">
              <ConnectButton />
            </div>
          </div>
        </header>

        <div className="w-full flex justify-center mt-8 px-4 md:px-0">
          <p className="text-sm md:text-xl text-[#86C232] w-[700px] text-center">
            Immerse yourself in a world of creativity and expression at
            EpicBlogs — where every post is a brushstroke in the canvas of your
            unique reading journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mt-10">
          {blogs.length > 0 ? (
            blogs?.map((blog) =>
              blog["isDeleted"] === false ? (
                <BlogCard
                  key={blog["id"]}
                  id={blog["id"]}
                  blogTitle={blog["title"]}
                  blogContent={blog["content"]}
                  blogAuthor={blog["author"]}
                />
              ) : null
            )
          ) : (
            <div className="mt-12">
              <p className="text-xl md:text-3xl text-white font-bold text-center">
                No Blogs yet!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
