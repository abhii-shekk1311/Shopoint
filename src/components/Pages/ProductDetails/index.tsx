import { useParams } from "react-router-dom";
import { EmptyStateUI } from "../../Atomic/EmptyStateUI";
import { LoaderUI } from "../../Atomic/LoaderUI";
import ProductDetailsCard from "../../UI/ProductDetailsCard";
import useProductDetails from "./view/useProductDetails";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const { productDetails, loadingProductDetails, handleBackClick, isError } =
    useProductDetails({
      productId: productId || "",
    });

  if (loadingProductDetails)
    return (
      <main className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <LoaderUI label="Loading product details..." />
      </main>
    );

  if (isError || !productDetails)
    return (
      <main className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <EmptyStateUI
          title="Unable to Fetch product Details"
          message="There is some error occured while fetching the product details. Please try again later."
        />
      </main>
    );

  return (
    <ProductDetailsCard product={productDetails} onBack={handleBackClick} />
  );
};

export default ProductDetails;
