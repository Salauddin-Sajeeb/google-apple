import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPassSchema, type InsertPass } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Mail, Award } from "lucide-react";

interface PassFormProps {
  onSubmit: (data: InsertPass) => void;
  isLoading?: boolean;
}

export default function PassForm({ onSubmit, isLoading }: PassFormProps) {
  const form = useForm<InsertPass>({
    resolver: zodResolver(insertPassSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      points: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase tracking-wide">First Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    placeholder="Enter your first name"
                    className="pl-10"
                    data-testid="input-first-name"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase tracking-wide">Last Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    placeholder="Enter your last name"
                    className="pl-10"
                    data-testid="input-last-name"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase tracking-wide">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    data-testid="input-email"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase tracking-wide">Points</FormLabel>
              <FormControl>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="pl-10"
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    data-testid="input-points"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full text-lg py-6"
          disabled={isLoading}
          data-testid="button-generate-pass"
        >
          {isLoading ? "Generating Pass..." : "Generate Pass"}
        </Button>
      </form>
    </Form>
  );
}
