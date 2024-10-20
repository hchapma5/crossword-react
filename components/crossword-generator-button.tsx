"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

export default function CrosswordGeneratorButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");
  const router = useRouter();
  const user = useUser();

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleGenerate = () => {
    if (!theme) return;
    toggleDialog();
    try {
      revalidateTag(`crossword-data:${theme}`);
    } catch (error) {
      console.error(error);
    }
    router.push(`/crossword?theme=${theme}`);
  };

  return (
    <>
      {children ? (
        <button onClick={toggleDialog}>{children}</button>
      ) : (
        <button
          className="hover:scale-96 gradient-bg relative cursor-pointer rounded-[6px] px-6 py-4 font-semibold text-white transition-all duration-200 ease-linear"
          onClick={toggleDialog}
        >
          Generate
        </button>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Crossword</DialogTitle>
            <DialogDescription>
              Enter a theme for your crossword puzzle. Our AI will generate a
              unique crossword based on your input.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="theme" className="text-right">
                Theme
              </Label>
              <Input
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="col-span-3 text-sm"
                placeholder="e.g., Nintendo, 90s Movies"
              />
            </div>
          </div>
          <DialogFooter>
            <SignedOut>
              <SignInButton>
                <SignInButton>
                  <Button>Generate Crossword</Button>
                </SignInButton>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button onClick={handleGenerate}>Generate</Button>
            </SignedIn>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
