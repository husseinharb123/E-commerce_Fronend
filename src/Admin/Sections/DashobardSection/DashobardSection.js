import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './DashobardSection.scoped.css'
import '../../CommonCSS/1.scoped.css'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import DonutChart from 'react-donut-chart';
export default function DashobardSection() {
 const  intialdata =[
    {
      label: 'Give you up',
      value: 25,
    },
    {
      label: '',
      value: 75,
    },
  ]

  const data = [
    { label: 'January ', sales: 21, revenue: 41 },
    { label: 'February', sales: 35, revenue: 79 },
    { label: 'March', sales: 75, revenue: 57 },
    { label: 'April', sales: 51, revenue: 47 },
    { label: 'May', sales: 41, revenue: 63 },
    { label: 'June', sales: 47, revenue: 71 },
    { label: 'June', sales: 47, revenue: 71 },
    { label: 'June', sales: 47, leads: 71 }
  ];


  const data1 = [
    { Month: 'march', 'Year(2023)': 21, 'Year(2022)': 41 },
    { Month: 'april', 'Year(2023)': 333, 'Year(2022)': 341 },
    { Month: 'june', 'Year(2023)': 34, 'Year(2022)': 232 },

  ];




  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [storeUsers, setStoreUsers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [categoriesChart, setCategoriesChart] = useState(intialdata)
  const [salesrevenueofmonth,setsalesrevenueofmonth] = useState(data)
  const [salesyearofmonth,setsalesyearofmonth] = useState(data1)

  const [visitors, setVisitors] = useState(0);
  const storeid = useParams().id
  useEffect(() => {
    // Fetch Orders Count
    const fetchOrdersCount = async () => {
      try {
        const response = await axios.get('/orders/count', {
          params: {
            storeid: storeid, // replace with your actual store id
          },
        });
        setOrdersCount(response.data.count);
      } catch (error) {
        console.error('Error fetching orders count:', error);
      }
    };

    // Fetch Products Count
    const fetchProductsCount = async () => {
      try {
        const response = await axios.get('/products/count', {
          params: {
            storeid: storeid, // replace with your actual store id
          },
        });
        setProductsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching products count:', error);
      }
    };

    // Fetch Store Visitors
  

    // Fetch Store Users
    const fetchStoreUsers = async () => {
      try {
        const response = await axios.post('/store/users', {
          storeid: storeid, // replace with your actual store id
        });
        setStoreUsers(response.data.count);
      } catch (error) {
        console.error('Error fetching store users:', error);
      }
    };

    // Fetch Total Sales
    const fetchTotalSales = async () => {
      try {
        const response = await axios.post('/store_sales_revenue', {
     
            storeid : storeid, // replace with your actual store id
     
        });
        setTotalSales(response.data.total_sales);
        setTotalRevenue(response.data.total_revenue);
      } catch (error) {
        console.error('Error calculating total sales:', error);
      }
    };

    // Fetch Product Category Counts
    const fetchProductCategoryCounts = async () => {
      try {
        const response = await axios.get(`/products/count/category/${storeid}`);
        console.log(response.data);
        setCategoriesChart(response.data);
      } catch (error) {
        console.error('Error fetching product category counts:', error);
      }
    };
    const fetchsalesrevenue = async () => {
      try {
        const response = await axios.get(`/sales_revenue_by_month/${storeid}`);
        setsalesrevenueofmonth(response.data);
      } catch (error) {
        console.error('Error fetching product category counts:', error);
      }
    };



    const fetchsalesyear = async () => {
      try {
        const response = await axios.get(`/sales_by_month_year/${storeid}`);
        console.log(response.data.data1);
        setsalesyearofmonth(response.data.data1);
      } catch (error) {
        console.error('Error fetching product category counts:', error);
      }
    };

    const fetchVisitors = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get('/store/visit', {
          params: {
            storeid: storeid // Replace with the actual storeid
          }
        });

        // Update state with the visitors count
        setVisitors(response.data.visitors);
      } catch (error) {
        // Handle error
      }
    };


    // Call all the API functions
    fetchTotalSales();
    fetchOrdersCount();
    fetchProductsCount();
    fetchStoreUsers();
    fetchVisitors();
    fetchProductCategoryCounts();
    fetchsalesrevenue();
    fetchsalesyear();
  }, []);















































  return (
    <>



      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Dashboard</h2>
        </div>
        <div className="row">
  <div className="col-lg-4">
    <div className="card card-body mb-4 shadow-sm">
      <article className="icontext">
        <span className="icon icon-sm rounded-circle bg-primary text-white">
          <i className="fa fa-shopping-cart" />
        </span>
        <div className="text">
          <h6 className="mb-1" style={{fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold'}}>Total Sales</h6>
          <span style={{color: '#0047AB', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold'}}>${totalSales}</span>
        </div>
      </article>
    </div>
  </div>
  <div className="col-lg-4">
    <div className="card card-body mb-4 shadow-sm">
      <article className="icontext">
        <span className="icon icon-sm rounded-circle bg-success text-white">
          <i className="fa fa-check-square" />
        </span>
        <div className="text">
          <h6 className="mb-1" style={{fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold'}}>Total Orders</h6>
          <span style={{color: '#0047AB', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold'}}>{ordersCount}</span>
        </div>
      </article>
    </div>
  </div>

  <div className="col-lg-4">
    <div className="card card-body mb-4 shadow-sm">
      <article className="icontext">
        <span className="icon icon-sm rounded-circle bg-warning text-white">
          <i className="fa fa-cubes" />
        </span>
        <div className="text">
          <h6 className="mb-1" style={{fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold'}}>Total Products</h6>
          <span style={{color: '#0047AB', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold'}}>{productsCount}</span>
        </div>
      </article>
    </div>
  </div>
</div>




<div className="row">
  <div className="col-lg-4">
  <div className="card card-body mb-4 shadow-sm">
  <article className="icontext">
    <span className="icon icon-sm rounded-circle bg-primary text-white">
      <i className="fa fa-money-bill-wave" />
    </span>
    <div className="text">
      <h6 className="mb-1" style={{fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold'}}>Total Revenue</h6>
      <span   style={{color: '#0047AB', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold'}}>
        ${totalRevenue}
      </span>
    </div>
  </article>
</div>
  </div>
  <div className="col-lg-4">
    <div className="card card-body mb-4 shadow-sm">
      <article className="icontext">
        <span className="icon icon-sm rounded-circle bg-success text-white">
          <i className="fa fa-history" />
        </span>
        <div className="text">
          <h6 className="mb-1" style={{fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold'}}>Visited Times</h6>
          <span   style={{color: '#0047AB', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold'}}     >{visitors}</span>
        </div>
      </article>
    </div>
  </div>

  <div className="col-lg-4">
    <div className="card card-body mb-4 shadow-sm">
      <article className="icontext">
        <span className="icon icon-sm rounded-circle bg-warning text-white">
          <i className="fa fa-users" />
        </span>
        <div className="text">
          <h6 className="mb-1" style={{fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold'}}>Total Users</h6>
          <span style={{color: '#0047AB', fontSize: '20px', fontFamily: 'Arial', fontWeight: 'bold'}}>{storeUsers}</span>
        </div>
      </article>
    </div>
  </div>
</div>


<hr/>



     

        <div className="row">
      <div className="col-md-12">
      </div>

      <div className="section col-md-6">
        <h3 className="section-title">Year-on-Year Sales Analysis</h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesyearofmonth} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <Tooltip />
              <XAxis dataKey="Month" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey="Year(2023)" stroke="#FB8833" />
              <Line type="monotone" dataKey="Year(2022)" stroke="#17A8F5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section col-md-6">
        <h3 className="section-title">Monthly Sales Performance</h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesrevenueofmonth} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <Legend/>
              <Bar dataKey="sales" fill="#FB8833" />
              <Bar dataKey="revenue" fill="#17A8F5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>


      


        <hr/>

        <div className="row">

        <h3 className="section-title">Visualizing Product Distribution in Numbers or Percentages</h3>
      <DonutChart data={categoriesChart} />



        </div>

<hr/>
        



      </section>

    </>
  );
}
