import Home from "@/components/screens/home/page";
import { ICategory } from "@/interfaces/category.interface";
import CategoriesService from "@/services/categories.service";
import { GetStaticProps, NextPage } from "next";

const HomePage: NextPage<{ categories: ICategory[] }> = ({ categories }) => {
  return <Home categories={categories} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await CategoriesService.getAll();
  const categories = response.data;

  return {
    props: {
      categories,
    },
    revalidate: 10,
  };
};

export default HomePage;
