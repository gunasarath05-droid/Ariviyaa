import type { Metadata } from "next";
import { OrderDetail } from "./OrderDetail";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order ${decodeURIComponent(id)}` };
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetail id={decodeURIComponent(id)} />;
}
