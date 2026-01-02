import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {/* UX IMPROVEMENT: 
        We slice the array to show only the most recent 3 toasts.
        Since they appear at the top-center, we don't want to block 
        the entire screen if the app spams notifications.
      */}
      {toasts.slice(-3).map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {/* STYLE: 
              Added 'flex-1' and 'text-left' to ensure the text takes up 
              available space and pushes the Action/Close buttons 
              to the correct positions in the Pill shape.
            */}
            <div className="grid gap-1 flex-1 text-left">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            
            {/* Render Action Button (if any) */}
            {action}
            
            {/* Close Button is now absolutely positioned 
              by the primitive in ui/toast.tsx 
            */}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}