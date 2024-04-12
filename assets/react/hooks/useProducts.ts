import { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageName: string;
}

export default function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>([]);
  debugger;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        // Handle the error here
        debugger;
      }
    };

    fetchData();
  }, []);

  return products;
}
