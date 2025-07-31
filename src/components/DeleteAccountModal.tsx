"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";

interface DeleteAccountModalProps {
  expiresAt: Date;
  onConfirm: () => void;
}

export default function DeleteAccountModal({ expiresAt, onConfirm }: DeleteAccountModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md">Delete Account</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
          <DialogDescription asChild>
            <div className="text-base">
              <div className="mt-4 mb-4">
                You have an active subscription. If you continue, your subscription will be
                <b> canceled immediately</b> and will not be renewed. You can continue to use
                all premium features until the end of your paid period on {formatDate(expiresAt)}.
              </div>
              <div className="mb-4">
                Immediately after this date, your account and all your data will be automatically
                and <b>irreversibly deleted</b>. You don&apos;t need to do anything else.
              </div>
              <div className="mb-4">
                This action <b>cannot be undone</b>. Please confirm if you wish to proceed with
                the deletion.
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          </DialogClose>
          <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={onConfirm}>Confirm</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
