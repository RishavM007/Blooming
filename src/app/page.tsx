import Navbar from "@/components/Navbar";
import UpperNav from "@/components/UpperNav";
import BottomNav from "@/components/BottomNav";
import Categories from "@/components/Catagories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Sale from "@/components/Sale";
import Hero from "@/components/Hero";



export default function Home() {
  return (
    <>
    <UpperNav />
    <Navbar />
    <Hero />
    <BottomNav/>
    <Categories />
    <FeaturedProducts  />
    <Sale />
    </>
  );
}
