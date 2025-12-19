import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginForms = [
  {
    title: "Log in to your account",
    bgColor: "bg-[#54aafb33]",
  },
  {
    title: "Log in as a client",
    bgColor: "bg-[#13ff7533]",
  },
];

export const LogInPage = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[1440px] min-h-[1024px] flex flex-col">
      <header className="w-full h-[54px] bg-[#d9cfc7d9]" />

      <main className="flex gap-[69px] justify-center pt-[172px] px-[100px]">
        {loginForms.map((form, index) => (
          <Card
            key={index}
            className={`w-[585px] h-[626px] ${form.bgColor} rounded-[10px] border-0 shadow-none`}
          >
            <CardContent className="flex flex-col items-center pt-[31px] px-[72px]">
              <h1 className="w-full h-[50px] [font-family:'Playfair_Display',Helvetica] font-black text-black text-[38px] text-center tracking-[0] leading-[49.5px] whitespace-nowrap">
                {form.title}
              </h1>

              <div className="w-full max-w-[357px] flex flex-col mt-[86px]">
                <Label
                  htmlFor={`email-${index}`}
                  className="w-[72px] h-[27px] [font-family:'Playfair_Display',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[26.6px] whitespace-nowrap"
                >
                  Email
                </Label>

                <div className="mt-0 ml-2.5">
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="Enter your email"
                    className="w-[345px] h-[57px] bg-white rounded-[5px] border-[1.5px] border-solid border-[#8e8e8e] shadow-[0px_4px_4px_#00000040] text-center placeholder:opacity-35 placeholder:[font-family:'Playfair_Display',Helvetica] placeholder:font-semibold placeholder:text-black placeholder:text-base"
                  />
                </div>
              </div>

              <div className="w-full max-w-[354px] flex flex-col mt-2.5 gap-[5px]">
                <Label
                  htmlFor={`password-${index}`}
                  className="w-[101px] h-[27px] [font-family:'Playfair_Display',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[26.6px] whitespace-nowrap"
                >
                  Password
                </Label>

                <div className="ml-[7px]">
                  <Input
                    id={`password-${index}`}
                    type="password"
                    placeholder="Enter your password"
                    className="w-[345px] h-[57px] bg-white rounded-[5px] border-[1.5px] border-solid border-[#8e8e8e] shadow-[0px_4px_4px_#00000040] text-center placeholder:opacity-35 placeholder:[font-family:'Playfair_Display',Helvetica] placeholder:font-semibold placeholder:text-black placeholder:text-base"
                  />
                </div>
              </div>

              <a
                href="#"
                className="w-[139px] h-6 mt-0.5 ml-[-215px] [font-family:'Playfair_Display',Helvetica] font-medium text-[#4089ff] text-base text-center tracking-[0] leading-[21.3px] whitespace-nowrap"
              >
                Forgot password?
              </a>

              <Button className="w-[345px] h-[60px] mt-[15px] bg-[#4089ff] rounded-[10px] shadow-[0px_4px_4px_#00000040] hover:bg-[#4089ff]/90 [font-family:'Playfair_Display',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[31.9px]">
                Next
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Button>

              <div className="w-[340px] h-[60px] mt-[27px] relative">
                <p className="absolute top-0 left-0 w-[253px] [font-family:'Playfair_Display',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[26.6px]">
                  Don&apos;t have an account yet?{" "}
                  <a
                    href="#"
                    className="[font-family:'Playfair_Display',Helvetica] font-normal text-[#4089ff] text-xl tracking-[0] leading-[26.6px] whitespace-nowrap"
                  >
                    Sign up
                  </a>
                </p>

                <p className="absolute top-[33px] left-2.5 w-full [font-family:'Playfair_Display',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[26.6px]">
                  Can&apos;t log in?{" "}
                  <a
                    href="#"
                    className="[font-family:'Playfair_Display',Helvetica] font-normal text-[#4089ff] text-xl tracking-[0] leading-[26.6px] whitespace-nowrap"
                  >
                    Visit our help center
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};
