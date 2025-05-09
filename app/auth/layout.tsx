import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <div className="grow flex items-center justify-center w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
