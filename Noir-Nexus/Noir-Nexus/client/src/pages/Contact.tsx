import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContact } from "@/hooks/use-contact";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Match the schema from shared/routes/schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message is too short"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { mutate, isPending } = useContact();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="bg-black min-h-screen relative selection:bg-white selection:text-black flex flex-col">
      <Navigation />
      
      {/* Background grain */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

      <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-32">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-6xl font-display text-white mb-2">CONTACT</h1>
              <p className="font-jp-serif text-white/30 text-2xl">お問い合わせ</p>
            </div>
            
            <p className="text-white/60 font-light leading-relaxed max-w-md">
              Initiate a secure transmission. I am available for select commissions and consultation. 
              Please provide detailed project parameters.
            </p>

            <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4 text-white/50 hover:text-white transition-colors cursor-pointer">
                    <span className="text-xs uppercase tracking-widest w-24">Email</span>
                    <span className="font-mono text-sm">executive@bateman.corp</span>
                </div>
                <div className="flex items-center gap-4 text-white/50 hover:text-white transition-colors cursor-pointer">
                    <span className="text-xs uppercase tracking-widest w-24">Secure</span>
                    <span className="font-mono text-sm">PGP: 0x4A2B9C</span>
                </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 md:p-10 backdrop-blur-sm"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-white/50">Identity</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="FULL NAME" 
                          {...field} 
                          className="bg-black/50 border-white/10 text-white placeholder:text-white/20 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white transition-all font-mono"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-mono text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-white/50">Coordinates</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="EMAIL ADDRESS" 
                          {...field} 
                          className="bg-black/50 border-white/10 text-white placeholder:text-white/20 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white transition-all font-mono"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-mono text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-white/50">Parameters</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="PROJECT DETAILS..." 
                          {...field} 
                          className="bg-black/50 border-white/10 text-white placeholder:text-white/20 min-h-[150px] rounded-none focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white transition-all font-mono resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-mono text-xs" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-white text-black hover:bg-white/90 rounded-none h-14 uppercase tracking-[0.2em] text-xs font-bold transition-all relative overflow-hidden group"
                >
                  {isPending ? (
                    <span className="animate-pulse">Transmitting...</span>
                  ) : (
                    <>
                        <span className="relative z-10">Send Transmission</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
