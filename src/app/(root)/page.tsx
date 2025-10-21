import ProductList from "@/components/shared/product/list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { ModProduct } from "@/types";

export const metadata = {
  title: "Home",
};

const HomePage = async () => {
  const latestProducts = (await getLatestProducts()) as ModProduct[];

  return (
    <>
      <ProductList data={latestProducts} title="products" limit={4} />
    </>
  );
};

export default HomePage;
