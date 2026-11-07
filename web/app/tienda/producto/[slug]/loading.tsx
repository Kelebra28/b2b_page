import { Header } from "@/components/organisms/Header";
import { ProductSkeleton } from "@/components/organisms/ProductSkeleton";

/** Esqueleto instantáneo de la ficha de producto. */
export default function Loading() {
  return (
    <>
      <Header />
      <main>
        <ProductSkeleton />
      </main>
    </>
  );
}
