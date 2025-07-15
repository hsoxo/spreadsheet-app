import Sheet from "@/components/Sheet";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-6">
        <Sheet rows={5} columns={10} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
