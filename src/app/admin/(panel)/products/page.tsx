import type { Metadata } from "next";
import { ProductsManager } from "./ProductsManager";

export const metadata: Metadata = {
  title: "Products & Stock",
};

export default function AdminProductsPage() {
  return <ProductsManager />;
}
