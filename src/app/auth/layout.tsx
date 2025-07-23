import Providers from "@/app/providers";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AuthHeader />
      <main className="bg-gray-950 min-h-screen mt-16">{children}</main>
      <Footer />
    </Providers>
  );
}
