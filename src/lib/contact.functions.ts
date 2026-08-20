import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // In a production app, this is where you would send an email or store the message.
    // For now, we validate server-side and return a success response.
    return {
      success: true,
      message: `Thanks for reaching out, ${data.name}! I'll get back to you soon.`,
    };
  });
