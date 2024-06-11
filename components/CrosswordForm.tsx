"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fetchPuzzleData } from "@/actions/fetchPuzzleData";
import { useServerAction } from "@/hooks/useServerActions";
import { ThreeDots } from "react-loader-spinner";

const formSchema = z.object({
  theme: z.string().regex(/^[A-za-z ]+$/, {
    message: "Sorry no special characters or numbers allowed",
  }),
  wordCount: z.string().transform((val) => parseInt(val, 10)),
});

export default function CrosswordForm() {
  const [runAction, isActionPending] = useServerAction(fetchPuzzleData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="w-1/3 font-mono">
      {isActionPending ? (
        <CardContent>
          <div className="flex items-center justify-center">
            <ThreeDots color="#000" height={150} width={150} />
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Crossword Generator</CardTitle>
            <CardDescription>
              Simply select a theme and word limit!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((formData) => runAction(formData))}
                className="grid w-full items-center gap-4"
              >
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel htmlFor="theme">Theme</FormLabel>
                        <FormControl>
                          <Input placeholder="Choose a theme" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="wordCount"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel>Word limit</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select word limit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            <SelectGroup>
                              {[5, 10, 15, 20].map((count) => (
                                <SelectItem
                                  key={`wordCount-${count}`}
                                  value={`${count}`}
                                >
                                  {count}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button
                  type="submit"
                  className="m-4 w-[100px] justify-self-center"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </>
      )}
    </Card>
  );
}
