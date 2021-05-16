import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return(
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="product-style">

            
            <div className="row">
                <div className="col-6">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>
                
                <div className="col-6">
                <div className="card">
                <div className="card-header name">
                    <h3>Product Details</h3>
                </div>
                <div className="card-body">
                <h6>Product Location: </h6>{product.location}
                <h6>Seller: </h6>{product.location}
                <h6>Seller Instagram: </h6>{product.instagram_handle}
                <h6>Seller Telegram: </h6>{product.telegram_no}
                <h6>Seller Email: </h6>{product.email_address}
                
                </div>
                
                </div>

                </div>

                
                    <h4 className="mb-4 mt-4">Related products</h4>
                    <div className="row">
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3 related-product col-sm-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                    </div>
               
            

            </div>
            </div>
        </Layout>
    )
}

export default Product;