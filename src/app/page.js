import Banner from "@/components/banner";
import Magic from "@/components/magic";
import Phone from "@/components/phone";
import ProductsPage from "./products/page";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Magic />
      <Phone />
      <ProductsPage />
    </div>
  );
};

export default Home;
