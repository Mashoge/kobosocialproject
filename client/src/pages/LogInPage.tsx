import { ArrowRightIcon } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export const LogInPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({
          title: "Error",
          description: "User not found",
          variant: "destructive",
        });
        return;
      }

      const userData = querySnapshot.docs[0].data();

      if (userData.active === false) {
        toast({
          title: "Account Inactive",
          description: "Your account is inactive. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      if (userData.role === "admin") {
        setLocation("/admin-dashboard");
      } else if (userData.role === "team-member") {
        setLocation("/team-member-dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid user role",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white w-full min-w-[1440px] min-h-[1024px] flex flex-col">
      <header className="w-full h-[54px] bg-[#d9cfc7d9]" />

      <main className="flex gap-[69px] justify-center pt-[172px] px-[100px]">
        {/* Unified Login */}
        <Card className="w-[585px] h-[626px] bg-[#54aafb33] rounded-[10px] border-0 shadow-none">
          <CardContent className="flex flex-col items-center pt-[31px] px-[72px]">
            <h1 className="w-full h-[50px] [font-family:'Playfair_Display',Helvetica] font-black text-black text-[38px] text-center tracking-[0] leading-[49.5px] whitespace-nowrap">
              Log in to your account
            </h1>

            <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
              <div className="w-full max-w-[357px] flex flex-col mt-[86px]">
                <Label
                  htmlFor="email"
                  className="w-[72px] h-[27px] [font-family:'Playfair_Display',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[26.6px] whitespace-nowrap"
                >
                  Email
                </Label>

                <div className="mt-0 ml-2.5">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-[345px] h-[57px] bg-white rounded-[5px] border-[1.5px] border-solid border-[#8e8e8e] shadow-[0px_4px_4px_#00000040] text-center placeholder:opacity-35 placeholder:[font-family:'Playfair_Display',Helvetica] placeholder:font-semibold placeholder:text-black placeholder:text-base"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                data-testid="button-login"
                className="w-[345px] h-[60px] mt-[40px] bg-[#4089ff] rounded-[10px] shadow-[0px_4px_4px_#00000040] hover:bg-[#4089ff]/90 [font-family:'Playfair_Display',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[31.9px]"
              >
                {isLoading ? "Logging in..." : "Next"}
                {!isLoading && <ArrowRightIcon className="ml-2 w-5 h-5" />}
              </Button>
            </form>

            <div className="w-[340px] mt-[27px] flex flex-col gap-2">
              <p className="[font-family:'Playfair_Display',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[26.6px]">
                Don&apos;t have an account yet?{" "}
                <a
                  href="#"
                  className="[font-family:'Playfair_Display',Helvetica] font-normal text-[#4089ff] text-xl tracking-[0] leading-[26.6px] whitespace-nowrap"
                >
                  Sign up
                </a>
              </p>

              <p className="[font-family:'Playfair_Display',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[26.6px]">
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
      </main>
    </div>
  );
};
