import React, { useEffect } from 'react'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'
import Banner from '../components/Home/Banner'
import GridSection from '../components/Home/GridSection'
import { fetchProduct } from '../redux/productSlice'
import {useDispatch} from 'react-redux'
import ProductList from '../components/Home/ProductList'
import FitGuide from '../components/Home/FitGuide'
import Footer from '../components/Home/Footer'
function Homepage() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchProduct())
  },[])

  return (
    <div>

   <Hero/>
   <GridSection/>
  
   <ProductList/>
    <Banner/>
    <FitGuide/>
    <Footer/>
    </div>
  )
}

export default Homepage
