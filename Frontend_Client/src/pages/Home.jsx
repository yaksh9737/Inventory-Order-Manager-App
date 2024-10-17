import { useEffect } from "react";
import { Main, Product } from "../components";
import Banner from "../components/Banner/Banner";
import Services from "../components/Services/Services";
import { Path } from "../Commen/Path";
import { useNavigate } from "react-router-dom";

function Home({ Auth }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (Auth == null && Auth?.role !== 2) {
      navigate(Path.login)
    }
    // eslint-disable-next-line
  }, [Auth])
  return (
    <>
      <Main />
      <Product />
      <Banner />
      <Services/>
    </>
  )
}

export default Home