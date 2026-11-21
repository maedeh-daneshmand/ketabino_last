"use client";

import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center p-4">
      <AuthModal
        isOpen={true}
        onClose={() => router.push("/dashboard")}
        defaultMode="login"
      />
    </div>
  );
}
