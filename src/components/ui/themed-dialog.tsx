import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemedDialog } from "@/hooks/useThemedDialog";

const ThemedDialog = DialogPrimitive.Root;
const ThemedDialogTrigger = DialogPrimitive.Trigger;
const ThemedDialogPortal = DialogPrimitive.Portal;
const ThemedDialogClose = DialogPrimitive.Close;

function ThemedDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  const dialogStyles = useThemedDialog();
  
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        dialogStyles.overlay,
        className
      )}
      {...props}
    />
  );
}

function ThemedDialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  const dialogStyles = useThemedDialog();

  return (
    <ThemedDialogPortal>
      <ThemedDialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          dialogStyles.content,
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              "absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              dialogStyles.closeButton
            )}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ThemedDialogPortal>
  );
}

function ThemedDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  const dialogStyles = useThemedDialog();
  
  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-center sm:text-left",
        dialogStyles.header,
        className
      )}
      {...props}
    />
  );
}

function ThemedDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function ThemedDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const dialogStyles = useThemedDialog();
  
  return (
    <DialogPrimitive.Title
      className={cn("text-lg leading-none font-semibold", dialogStyles.title, className)}
      {...props}
    />
  );
}

function ThemedDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  ThemedDialog,
  ThemedDialogClose,
  ThemedDialogContent,
  ThemedDialogDescription,
  ThemedDialogFooter,
  ThemedDialogHeader,
  ThemedDialogOverlay,
  ThemedDialogPortal,
  ThemedDialogTitle,
  ThemedDialogTrigger,
};
