import Link from "next/link";
import DocumentIcon from "./components/DocumentIcon";
import PageHeaders from "./components/PageHeaders";
import CreateModal from "./components/CreateModal";

export default function Home() {
  return (
    <div className="bg-[#222629] min-h-screen text-white">
      <main className="p-4 relative">
        <header className="flex justify-around my-8">
          <Link href="/" className="flex gap-1">
            <DocumentIcon />
            <span className="text-[#86C232]">EpicBlogs</span>
          </Link>
          <div className="flex gap-2">
            <button className=" py-2 px-4 rounded-full border-2 border-[#86C232] cursor-pointer">
              Create Blog
            </button>
            <button className="bg-[#86C232] py-2 px-4 rounded-full border-2 border-slate-700/50 cursor-pointer">
              Connect Wallet
            </button>
          </div>
        </header>
        <PageHeaders h1Text={"Read the EPIC blogs here from the world!"} />

        <CreateModal />
      </main>
    </div>
  );
}
