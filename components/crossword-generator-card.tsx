"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { fetchPuzzleData } from "@/utils/actions";

// TODO: Put Dialog modal in a separate component, to be used in the navbar

export default function CrosswordGeneratorCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="mx-auto w-full max-w-sm cursor-pointer transition-shadow duration-300 hover:shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Generate your own crossword
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Create unique, personalized crosswords with the power of AI
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button>Get Started</Button>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Crossword</DialogTitle>
            <DialogDescription>
              Enter a theme for your crossword puzzle. Our AI will generate a
              unique crossword based on your input.
            </DialogDescription>
          </DialogHeader>
          <form action={fetchPuzzleData}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="theme" className="text-right">
                  Theme
                </Label>
                <Input
                  id="theme"
                  name="theme"
                  className="col-span-3"
                  placeholder="e.g., Space, History, Sports"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Generate Crossword</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
