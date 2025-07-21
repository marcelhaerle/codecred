import Providers from "@/app/providers";
import AuthHeader from "@/components/AuthHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AuthHeader />
      <main className="bg-gray-950 min-h-screen mt-24">{children}</main>
    </Providers>
  );
}
