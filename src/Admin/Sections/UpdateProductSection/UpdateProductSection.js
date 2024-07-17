import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './AddProductSection.scoped.css';
import '../../CommonCSS/1.scoped.css'
import { useImmer, useImmerReducer } from "use-immer";
import axios from "axios";
export default function UpdateProductSection() {

  const parm = useParams()
  const productid = parm.id;
  const [productData, setProductData] = useState({});
  const [image ,setimage] =useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/productdetail/${productid}`);
        setProductData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);



  function handleupdate(e) {
    e.preventDefault();
  
    const data = new FormData();
  
    if (image) {
      data.append("imgurl", image);
    }
  
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        data.append(key, productData[key]);
      }
    }
  
    const apiUrl = `/updateproduct/${productid}`;
  
    // Define an async function to put the product
    async function updateProduct() {
      try {
        const response = await axios.put(apiUrl, data);
        console.log('Product updated successfully:', response.data);
      } catch (error) {
        console.error('Failed to update product:', error.message);
      }
    }
  
    // Call the async function to put the product
    updateProduct();
  }




  return (
    <>

      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form>
          <div className="content-header">
            <Link className="btn btn-danger text-white" to="products">
              Go to products
            </Link>
            <h2 className="content-productname">Update product</h2>
            <div>
              <button type="submit" className="btn btn-primary"
                onClick={handleupdate}
              >
                Update now
              </button>
            </div>
          </div>
          <div className=" border-danger">
            <div className="w-75">
              <div className="card mb-4 shadow-sm ">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                       productname<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_title"
                      required
                      autoComplete="off"
                      value={productData.productname}
                      onChange={(e) => setProductData({ ...productData, productname: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_retailerprice" className="form-label">
                      Retailer price<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_retailerprice"
                      required
                      autoComplete="off"
                      value={productData.retailerprice}
                      onChange={(e) => setProductData({ ...productData, retailerprice: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Quantity<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      value={productData.in_stock}
                      onChange={(e) => setProductData({ ...productData, in_stock: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Discount
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      value={productData.discount}
                      onChange={(e) => setProductData({ ...productData, discount: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price h2" className="form-label">
                      Barcode<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      value={productData.barcode}
                      onChange={(e) => setProductData({ ...productData, barcode: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Category<span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className="form-select"
                      value={productData.category}
                      onChange={(e) => setProductData({ ...productData, category: e.target.value })}

                    >
                      <option value="">Select a category</option>
                      <option value="Apparel and accessories">Apparel and accessories</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home and garden">Home and garden</option>
                      <option value="Beauty and personal care">Beauty and personal care</option>
                      <option value="Sports and fitness">Sports and fitness</option>
                      <option value="Toys and games">Toys and games</option>
                      <option value="Food and beverages">Food and beverages</option>
                      <option value="Health and wellness">Health and wellness</option>
                    </select>
                  </div>
                  <div className="mb-4">

                    <input
                      type="checkbox"
                      checked= {productData.fast_delivery}
                      onChange={(e) => setProductData({ ...productData, fast_delivery: e.target.value })}
                    />
                    <label className="form-label">Fast Delivery</label>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">productdes<span style={{ color: 'red' }}>*</span></label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={productData.productdes}
                      onChange={(e) => setProductData({ ...productData, productdes: e.target.value })}

                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>

                    <input
                      className="form-control mt-3 ui-autocomplete-input"
                      type="file"
                      autoComplete="off"
                      onChange={(e) => {setimage(e.target.files[0])}}

                      
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
