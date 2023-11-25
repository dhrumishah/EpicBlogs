import Link from "next/link";
import DocumentIcon from "./components/DocumentIcon";
import PageHeaders from "./components/PageHeaders";

export default function Home() {
  return (
    <div className="bg-[#222629] min-h-screen text-white">
      <main className="p-4 max-w-2xl mx-auto">
        <header className="flex justify-between my-8">
          <Link href="/" className="flex gap-1">
            <DocumentIcon />
            <span className="text-[#86C232]">EpicBlogs</span>
          </Link>
          <button className="bg-[#86C232] py-2 px-4 rounded-full border-2 border-slate-700/50 cursor-pointer">
            Connect Wallet
          </button>
        </header>
        <PageHeaders h1Text={"Read the EPIC blogs here from the world!"} />
      </main>
    </div>
  );
}
