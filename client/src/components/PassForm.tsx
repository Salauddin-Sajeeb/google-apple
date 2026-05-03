import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type InsertPass } from "@shared/schema";
import { Award, Mail, User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface PassFormProps {
  form: UseFormReturn<InsertPass>;
  onSubmit: (data: InsertPass) => void;
  isLoading?: boolean;
}

export default function PassForm({ form, onSubmit, isLoading }: PassFormProps) {
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
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-4 text-muted-foreground" />
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
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-4 text-muted-foreground" />
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
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-4 text-muted-foreground" />
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
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-4 text-muted-foreground" />
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

        <button
          type="submit"
          disabled={isLoading}
          className={`
            relative w-full overflow-hidden rounded-xl px-6 py-5 text-lg font-semibold
            text-white bg-gradient-to-r from-sky-600 to-blue-500
            shadow-md shadow-blue-500/30 transition-all duration-300
            hover:shadow-blue-400/40 hover:-translate-y-0.5 active:translate-y-0
            disabled:opacity-70 disabled:cursor-not-allowed
          `}
        >
          <span className="relative z-10">
            {isLoading ? "Generating Pass..." : "Generate Pass"}
          </span>

          {/* shine animation */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shine_2s_linear_infinite]"
          />

          <style>{`
            @keyframes shine {
              100% { transform: translateX(100%); }
            }
          `}</style>
        </button>
      </form>
    </Form>
  );
}
