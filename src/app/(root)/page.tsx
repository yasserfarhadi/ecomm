import ProductList from "@/components/shared/product/list";
import { Button } from "@/components/ui/button";
import sampleData from "@/db/sample-data";

export const metadata = {
  title: "Home",
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = async () => {
  console.log(sampleData)
  await delay(1000);
  return (
    <>
      Pro store
      <Button>GGoo</Button>
      <ProductList data={sampleData.products} title="products" limit={4}/>
    </>
  );
};

export default HomePage;
