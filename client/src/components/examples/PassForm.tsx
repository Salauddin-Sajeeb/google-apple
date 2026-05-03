import PassForm from '../PassForm';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPassSchema, type InsertPass } from "@shared/schema";

export default function PassFormExample() {
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
    <PassForm 
      form={form}
      onSubmit={(data) => console.log('Form submitted:', data)} 
      isLoading={false}
    />
  );
}
