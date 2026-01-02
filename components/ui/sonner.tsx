import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // UX: Default to top-center for maximum visibility (mobile & desktop)
      position="top-center"
      // UX: Stacks toasts vertically
      expand={true}
      // UX: Adds automatic success/error iconography and colors
      richColors={true}
      closeButton={true}
      // UX: Adds a small gap between stacked toasts for a cleaner look
      gap={6}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/90 group-[.toaster]:text-foreground group-[.toaster]:border-border/40 group-[.toaster]:shadow-2xl group-[.toaster]:backdrop-blur-xl group-[.toaster]:rounded-3xl group-[.toaster]:px-6 group-[.toaster]:py-3 group-[.toaster]:items-start",
          description: "group-[.toast]:text-muted-foreground text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:text-xs group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:text-xs group-[.toast]:font-medium",
          // Customizing the specific states to match the rounded/glass look
          error:
            "group-[.toaster]:!text-red-600 group-[.toaster]:!bg-red-50/90 dark:group-[.toaster]:!bg-red-950/50 dark:group-[.toaster]:!text-red-200 group-[.toaster]:!border-red-200 dark:group-[.toaster]:!border-red-900",
          success:
            "group-[.toaster]:!text-green-600 group-[.toaster]:!bg-green-50/90 dark:group-[.toaster]:!bg-green-950/50 dark:group-[.toaster]:!text-green-200 group-[.toaster]:!border-green-200 dark:group-[.toaster]:!border-green-900",
          info:
            "group-[.toaster]:!text-blue-600 group-[.toaster]:!bg-blue-50/90 dark:group-[.toaster]:!bg-blue-950/50 dark:group-[.toaster]:!text-blue-200 group-[.toaster]:!border-blue-200 dark:group-[.toaster]:!border-blue-900",
          warning:
             "group-[.toaster]:!text-amber-600 group-[.toaster]:!bg-amber-50/90 dark:group-[.toaster]:!bg-amber-950/50 dark:group-[.toaster]:!text-amber-200 group-[.toaster]:!border-amber-200 dark:group-[.toaster]:!border-amber-900",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };