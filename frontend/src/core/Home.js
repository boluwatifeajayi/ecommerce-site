import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';


const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Covenant University Shopping Mall"
            description="Find Anything You Need In School Online"
            className="container-fluid"
        >
            <Search/>
            <div className="home-style">

            
            {/* <Search /> */}
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (

                        <Fragment className="row">
                        <div key={i} className="col-sm-3 mb-3">
                            <Card product={product} />
                        </div>
                        </Fragment>
                            
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    
                    <Fragment className="row">
                    <div key={i} className="col-sm-3 mb-3">
                        <Card product={product} />
                    </div>
                    </Fragment>
                    
                ))}
            </div>
            </div>
        </Layout>
    )
}
    


export default Home;