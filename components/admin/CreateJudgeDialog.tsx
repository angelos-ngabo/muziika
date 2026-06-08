"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createJudgeAccount } from "@/lib/auth";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { GENRES } from "@/types";
import type { CreateJudgeInput } from "@/types";
import { toast } from "sonner";

const EMPTY_FORM: CreateJudgeInput = {
  name: "",
  email: "",
  password: "",
  genre: "R&B",
};

interface CreateJudgeDialogProps {
  assignedBy: string;
  trigger?: React.ReactNode;
  onCreated?: () => void;
}

export function CreateJudgeDialog({ assignedBy, trigger, onCreated }: CreateJudgeDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateJudgeInput>(EMPTY_FORM);
  const [creating, setCreating] = useState(false);

  const resetForm = () => setForm(EMPTY_FORM);

  const handleCreate = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Please fill in name, email, and password.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setCreating(true);
    try {
      await createJudgeAccount(
        {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          genre: form.genre,
        },
        assignedBy
      );
      toast.success("Judge account created. Share the login credentials with them.");
      setOpen(false);
      resetForm();
      onCreated?.();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="orange" className="rounded-full lowercase">
            <UserPlus className="mr-2 h-4 w-4" />
            create judge
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border-muziika-orange/20 bg-muziika-dashboard">
        <DialogHeader>
          <DialogTitle className="text-white">Create judge account</DialogTitle>
          <DialogDescription className="text-muziika-dashboard-muted">
            Provisions a login for a genre judge. They can sign in at /login and access the judge
            dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Full name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
              className="mt-1 border-muziika-orange/20 dashboard-glass text-white"
            />
          </div>
          <div>
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="judge@muziika.rw"
              className="mt-1 border-muziika-orange/20 dashboard-glass text-white"
            />
          </div>
          <div>
            <Label className="text-white">Temporary password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 8 characters"
              className="mt-1 border-muziika-orange/20 dashboard-glass text-white"
            />
          </div>
          <div>
            <Label className="text-white">Assigned genre</Label>
            <Select
              value={form.genre}
              onValueChange={(v) => setForm({ ...form, genre: v as CreateJudgeInput["genre"] })}
            >
              <SelectTrigger className="mt-1 border-muziika-orange/20 dashboard-glass text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="orange"
            className="rounded-full lowercase"
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create judge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
