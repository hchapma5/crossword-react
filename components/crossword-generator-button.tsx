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
import generateCrosswordDataAction from "@/app/crossword/page";
import Link from "next/link";

export default function CrosswordGeneratorButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {children ? (
        <button onClick={toggleDialog}>{children}</button>
      ) : (
        <Button onClick={toggleDialog}>Generate</Button>
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
                className="col-span-3"
                placeholder="e.g., Space, History, Sports"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={toggleDialog}>
              <Link href={`/crossword?theme=${theme}`}>Generate Crossword</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
