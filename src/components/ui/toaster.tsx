import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <div className="pointer-events-none fixed left-4 bottom-4 z-50 flex flex-col gap-3 w-[90vw] max-w-sm sm:max-w-md">
        {toasts.map(({ id, title, description, action, ...props }) => (
          <Toast
            key={id}
            {...props}
            className="pointer-events-auto w-full border border-border bg-background shadow-lg rounded-xl p-4"
          >
            <div className="flex flex-col gap-1">
              {title && (
                <ToastTitle className="text-base font-semibold text-foreground">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm text-muted-foreground">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="absolute top-2 right-2" />
          </Toast>
        ))}
      </div>

      <ToastViewport className="mr-6 mb-4"/>
    </ToastProvider>
  );
}
