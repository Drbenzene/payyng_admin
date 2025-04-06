// src/components/AuthLayout.js
import Image from "next/image";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div
      //   style={{ backgroundImage: "url(/images/auth_bg.svg)" }}
      className="relative bg-[#F2C94C3D] bg-cover bg-center flex flex-col md:flex-row h-screen"
    >
      <Link href="/">
        <Image
          src="/images/logo_transparent.svg"
          alt="lottonownow"
          width={134}
          height={79.01}
          className="absolute z-50 cursor-pointer top-6 md:top-12 left-4 md:left-16 w-fit"
        />
      </Link>

      {/* Form Section */}
      <section className="flex-1 scrollbar-hide flex items-center w-full justify-center container">
        <div className="">{children}</div>
      </section>

      {/* Side Image Section */}
      <section className="hidden md:hidden lg:flex relative h-screen">
        {/* <div className="relative w-full h-[500px]"> */}
        <Image
          src="/images/auth_bg.svg"
          height={967}
          width={724}
          // fill
          alt="bg layout"
          className="mx-auto w-full h-full"
        />
        {/* </div> */}
      </section>
    </div>
  );
}
