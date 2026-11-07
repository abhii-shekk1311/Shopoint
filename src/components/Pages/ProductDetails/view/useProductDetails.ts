import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSingleProductDetails,
  type ProductDetailsType,
} from "../../../../lib/api/services/productsService";

const useProductDetails = ({ productId }: { productId: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productDetails, setProductDetails] =
    useState<ProductDetailsType | null>(null);
  const [loadingProductDetails, setLoadingProductDetails] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  // Fetch product details using the productId
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoadingProductDetails(true);
        setIsError(null);
        const results = await getSingleProductDetails(productId);
        if (isMounted) setProductDetails(results);
      } catch (error) {
        if (isMounted) {
          setIsError("Failed to fetch product details.");
        }
      } finally {
        if (isMounted) setLoadingProductDetails(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleBackClick = () =>
    (location.state as { fromListing?: boolean } | null)?.fromListing
      ? navigate(-1)
      : navigate("/");

  return { productDetails, loadingProductDetails, handleBackClick, isError };
};

export default useProductDetails;
