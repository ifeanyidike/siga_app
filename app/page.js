"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "@components/Searchbar";
import Listservices from "@components/servicesfolder/Listservices";

// const getServices = async () => {
//   const { data } = await axios.get(
//     `${process.env.SERVICE_DATA_URI}/api/ourservices`
//   )
//   return data
// }

const Homepage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch(`/api/ourservices`);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <section className="homepage">
      <div className="mysearchbarpositiondiv">
        <Searchbar getSearchResults={(results) => setData(results)} />
      </div>
      <div className="banner_container">
        <div className="image-container">
          <Image
            src="/assets/images/banner.png"
            alt="banner display"
            width={500}
            height={500}
          />
        </div>
        <div className="text-container">
          <h2> Search Siga Services</h2>
          <div>Check the Spotlight Event!</div>
          <p>
            Discover the Harmony of Your Dreams at our Music Event Performance &
            Instrument Tutoring Services. Unleash your inner maestro with expert
            guidance and captivating performances. Join us for an unforgettable
            musical journey today !...
          </p>
          <div className="homepage_btn_wrapper">
            <div>
              <Link href={"/register"}>
                <button className="homepage_action_registerbtn">
                  Register
                </button>
              </Link>
              <Link href={"/contact"}>
                <button className="homepage_action_btn"> Contact</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="boundary">
        <p>List of Siga Services</p>
      </div>
      <div className="sigaserviceitem_container">
        <Listservices key={data._id} data={data} />
      </div>
    </section>
  );
};

export default Homepage;
