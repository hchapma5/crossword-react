import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

interface CrosswordFormProps {
  onSubmit: (theme: string, wordCount: number) => void;
}

const formSchema = z.object({
  theme: z.string().regex(/^[A-za-z ]+$/, {
    message: "Sorry no special characters or numbers allowed",
  }),
  wordCount: z.string().transform((value) => parseInt(value, 10)),
});

export default function CrosswordForm({ onSubmit }: CrosswordFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "",
      wordCount: 10,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.theme, values.wordCount);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Crossword Generator</CardTitle>
        <CardDescription>Simply select a theme and word limit!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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
                    <FormLabel htmlFor="word-limit">Word limit</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger id="word-limit">
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
            <Button type="submit" className="w-[100px] justify-self-center m-4">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
