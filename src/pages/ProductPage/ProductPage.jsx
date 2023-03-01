import React, {useCallback, useContext} from 'react';
import api from "../../utils/api";
import Spinner from "../../components/Spiner/Spiner";
import Product from "../../components/Product/Product";
import s from '../../components/Product/Product.module.css'
import {useParams} from "react-router-dom";
import NotFoundPage from "../../pages/ NotFoundPage/NotFoundPage";
import useApi from "../../hooks/useApi";
import {CardContext} from "../../context/cardContext";

const ProductPage = () => {
    const { productId } = useParams();
    const { handleLike } = useContext(CardContext);
    const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);
    const { data: product, setData: setProduct, isLoading, error: isError } = useApi(handleGetProduct);

    const handleProductLike = useCallback(() => {
        handleLike(product).then((updateProduct) => {
            setProduct(updateProduct);
        })
    }, [product, setProduct, handleLike]);

  return (
      <>
          {isLoading ? (
                  <div className={s.wrapperLoader}>
                      <Spinner />
                  </div>
              ) : (
              !isError && <Product {...product} onProductLike={handleProductLike} />)}
          {isError ? (
              <NotFoundPage />
          ): null}
      </>
  );
};

export default ProductPage;
