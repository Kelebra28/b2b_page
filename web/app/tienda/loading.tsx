import { Header } from "@/components/organisms/Header";
import { StoreSkeleton } from "@/components/organisms/StoreSkeleton";

/** Esqueleto instantáneo de la tienda (portada, categorías y búsqueda) mientras llega el catálogo. */
export default function Loading() {
  return (
    <>
      <Header />
      <main>
        <StoreSkeleton />
      </main>
    </>
  );
}
