import Link from "next/link";

export default function LoginError() {
  return (
    <section className=" flex flex-col h-screen justify-center items-center text-center text-bold  gap-3">
      <p className="text-center text-bold ">Invalid password.Try again.</p>
      <Link href="/" className="underline text-black">
        Go back
      </Link>
    </section>
  );
}
