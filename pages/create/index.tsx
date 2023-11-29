import React, { useState } from "react";
import { useAccount } from "wagmi";
import { usePublicClient, useWalletClient } from "wagmi";
import ABI from "../../utils/abi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type Props = {};

const Create: React.FC<Props> = (props: Props) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  const router = useRouter();

  const createBlog = async (e: any) => {
    e.preventDefault();

    if (!account) {
      toast.error("Connect your wallet first!", {
        isLoading: false,
        autoClose: 3000,
      });
    } else if (blogTitle === "" || blogContent === "") {
      toast.error("Fill both the fields", {
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      const data = await publicClient.simulateContract({
        account,
        address: "0xE92ac71C430c605E0D45Fc1dA64979ea75A946a4",
        abi: ABI,
        functionName: "createPost",
        args: [blogTitle, blogContent],
      });

      if (!walletClient) {
        return;
      }
      const tx = await walletClient.writeContract(data.request);
      const toastId = toast.loading("Creating Blog...");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: tx,
      });
      toast.update(toastId, {
        render: "Blog Created sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      router.push("/");
    }
  };

  return (
    <div className="flex justify-center w-full bg-[#474B4F] min-h-screen max-h-fit p-8">
      {/* <Navbar /> */}
      <div className="rounded-lg flex flex-col">
        <div className="flex justify-center text-center gap-8">
          <h1 className="text-[#86C232] font-bold text-3xl md:text-4xl text-center mt-1 md:mt-0">
            Create your blog
          </h1>
        </div>
        <div className="relative py-4 flex-auto mt-8">
          <form className="w-full">
            <label className="block text-white text-xl font-bold mb-1">
              Title
            </label>
            <input
              required
              onChange={(e) => setBlogTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6"
            />
            <label className="block text-white text-xl font-bold mb-1">
              Content
            </label>
            <textarea
              required
              onChange={(e) => setBlogContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6"
              rows={15}
              cols={100}
            />
            <div className="mx-6 mt-4">
              <button
                className="w-full text-white bg-[#86C232] active:bg-[#61892F] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:scale-105 hover:border-white hover:border-2"
                type="submit"
                onClick={createBlog}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Create;
