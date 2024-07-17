import React, { useContext, useEffect, useState } from 'react';
import './SearchElement.scoped.css';
import image from './product-1.jpg';
import { Link } from 'react-router-dom';
import StarRating from '../Starrating/StarRating';
import axios from 'axios';
import { cartDispatchContext } from '../../Contexts/CartcontextProvider';
export default function SearchElement({
    productid,
    productname,
    initialprice,
    discount,
    currentprice,
    reviews,
    rating,
    imgurl,
    in_stock
}) 
{
    const [addedToCart, setAddedToCart] = useState(false);
    const [addedToWishlist, setAddedToWishlist] = useState(false);

    const dispatch = useContext(cartDispatchContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inoutwishcart/${productid}`);
                setAddedToCart(response.data.addedToCart);
                setAddedToWishlist(response.data.addedToWishlist);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    async function addToCart() {
        if (addedToCart) {
            await deleteFromCart();
            setAddedToCart(false);
            
            return ;
        }
        setAddedToCart(true);      
        try {
          const response = await axios.post('/postcart', {
            userid: localStorage.getItem('_id'),
            productid: productid
          });
          console.log(response.data); // Successfully added to cart
          if(addedToWishlist){
            await deleteFromWishlist();
            setAddedToWishlist(false);
          }
          dispatch({type:"recount"});
        } catch (error) {
          console.error(error);
          // TODO: show error message to user
        }
      }
      
      async function addToWishlist() {
        if (addedToWishlist) {
        await deleteFromWishlist();
        setAddedToWishlist(false);
          return; // If already added to wishlist, don't do anything
        }
        setAddedToWishlist(true);      
        try {
          const response = await axios.post('/postwish', {
            userid: localStorage.getItem('_id'),
            productid: productid
          });
          console.log(response.data); // Successfully added to wishlist
          if(addedToCart){
            await deleteFromCart();
            setAddedToCart(false);
          }
          
        } catch (error) {
          console.error(error);
          // TODO: show error message to user
        }
      }
      
      async function deleteFromWishlist() {

      }
      
      async function deleteFromCart() {
        try {
          const response = await axios.post('/deletecart', {
            userid: localStorage.getItem('_id'),
            productid: productid
          });
          dispatch({type:"recount"});
          console.log(response.data); // Successfully deleted cart item
        } catch (error) {
          console.error(error);
          // TODO: show error message to user
        }
      }




    return (
        <>
<div className="col-lg-4 col-md-6 col-sm-6 pb-1">
    <div className={`product-item bg-light mb-4 ${parseInt(in_stock) <= 0 ? 'out-of-stock' : ''}`}>
        <div className="product-img position-relative overflow-hidden card-wrapper">
            <img
                className="img-fluid w-100 card-img"
                src={`http://localhost:8070/images/${imgurl}`}
                alt=""
            />
            <div className="product-action card-action">
                {parseInt(in_stock) > 0 && (
                    <>
                        <Link
                            className={`btn btn-outline-dark btn-square ${addedToCart ? 'chosen' : ''}`}
                            onClick={addToCart}
                        >
                            <i className="fa fa-shopping-cart" />
                        </Link>
                        <Link
                            className={`btn btn-outline-dark btn-square ${addedToWishlist ? 'chosen' : ''}`}
                            onClick={addToWishlist}
                        >
                            <i className="far fa-heart" />
                        </Link>
                        <Link
                    className="btn btn-outline-dark btn-square"
                    to={`/productdetail/${productid}`}
                >
                    <i className="fa fa-search" />
                </Link>
                    </>
                )}

            </div>
        </div>
        <div className="text-center py-4 card-content">
            <Link
                className="h6 text-decoration-none text-truncate card-heading"
                to=""
            >
                {productname}({reviews})
            </Link>
            <div className="d-flex align-items-center justify-content-center mt-2">
                <h5 className="price">${currentprice}</h5>
                <h6 className="text-muted ml-2 previous-price"><del>${initialprice}</del></h6>
                <div className="discount">{discount}% off</div>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1">
                <StarRating float={true} rating={rating} />
            </div>
        </div>
    </div>
</div>
        </>
    )
    }