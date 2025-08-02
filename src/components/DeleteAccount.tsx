"use client";

interface DeleteAccountProps {
  onConfirm: () => void;
}

export default function DeleteAccount({ onConfirm }: DeleteAccountProps) {
  return (
    <div className="min-h-[200px]">
      <div className=" bg-gray-800 border rounded-2xl p-8 flex flex-col justify-between h-full relative border-blue-800 shadow-2xl shadow-blue-500/10">
        <h1 className="text-2xl font-bold tracking-tighter text-white">Delete Account</h1>
        <p className="text-gray-400 mt-2">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={onConfirm}>Delete Account</button>
      </div>
    </div>
  );
}
