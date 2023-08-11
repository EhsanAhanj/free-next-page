import Otp from "@/components/Otp";

export default function Home() {
  return (
    <main className="flex max-w-[100vw] min-h-screen flex-col items-center justify-between">
      <div className="flex w-full min-h-screen justify-center bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 items-center dark:from-inherit ">
        <Otp />
      </div>
    </main>
  );
}
