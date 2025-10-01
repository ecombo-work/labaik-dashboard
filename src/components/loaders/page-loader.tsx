import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="fixed  w-full top-0 left-0 right-0 bottom-0 transform-x-1/2 transform-y-1/2 flex items-center justify-center min-h-screen">
      <Image src="/logo.png" alt="loader" width={300} height={300} />
    </div>
  );
}
