import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Button } from "app/components/ui/button";

type DialogFormProps = {
  placeholder: string;
  title: string;
  add: boolean;
};

export default function DialogForm({
  placeholder,
  title,
  add = false,
}: DialogFormProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline"> {placeholder}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder={add ? "Enter a value" : ""}
                defaultValue={add ? "" : "Marwyn"}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                placeholder={add ? "Enter a value" : ""}
                defaultValue={add ? "" : "Marwyn"}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
