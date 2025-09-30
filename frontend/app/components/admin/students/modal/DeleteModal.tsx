import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import { Button } from "~/components/ui/button";

type DeleteModalProps = {
  id: string | number;
  onDelete: (id: string | number) => Promise<void> | void;
  triggerText?: string;
};

export default function DeleteModal({
  id,
  onDelete,
  triggerText = "Delete",
}: DeleteModalProps) {
  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className={
          "text-red-500 w-full hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        }
      >
        {triggerText}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Record</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Do you want to delete this record?
        </DialogDescription>

        <section className="grid grid-cols-2 gap-x-2 pt-6">
          <div>
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
            >
              Yes, delete record
            </Button>
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No
            </Button>
          </DialogClose>
        </section>
      </DialogContent>
    </Dialog>
  );
}
