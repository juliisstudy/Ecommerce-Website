import { Suspense } from "react";
import { getProduct } from "@/app/lib/getData";
import type { Metadata } from "next";
import ProductDetail from "../component/ProductDetail";
type Params = {
  params: {
    productId: number;
  };
};

export async function generateMetadata({
  params: { productId },
}: Params): Promise<Metadata> {
  const productData: Promise<Product> = getProduct(productId);
  const productDetail = await productData;
  return {
    title: productDetail.title,
    description: `This is the page of ${productDetail.title}`,
  };
}
export default async function ProductPage({ params: { productId } }: Params) {
  const productData: Promise<Product> = getProduct(productId);
  const productDetail = await productData;
  return (
    <div className="mx-20 pt-32">
      <h1>{productDetail.title}</h1>
      <Suspense fallback={<h1>loading</h1>}>
        <ProductDetail product={productDetail} />
      </Suspense>
    </div>
  );
}
