import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="bg-background flex container items-start justify-center gap-6 p-6 sm:pt-32 ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="ex.club"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src="/EXP_CLUB_LOGO_DARK_TEXT_s1fwrv.svg"
            height={150}
            width={150}
            alt="logo"
          ></Image>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
