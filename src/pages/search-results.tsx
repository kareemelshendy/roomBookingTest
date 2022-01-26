import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

import Layout from "../components/layout/layout";
import { SearchResultsHOC } from "../hoc/SearchResults-hoc/search-results-hoc";
import { Location, Room, RoomPage, Service } from "../models";
import axios from "../utils/axios";
import { fetcher } from "../utils/fetcher.utils";
interface Props {
  roomsPage: RoomPage;
  services: Service[];
}

const SearchResults = ({ roomsPage, services }: Props) => {
  const router = useRouter();
  const maxNightPrice = router.query.maxNightPrice as string;
  const minNightPrice = router.query.minNightPrice as string;
  const service = router.query.service as string[];
  const lat: string = router.query.latitude as string;
  const lng: string = router.query.longitude as string;
  const location = {
    lat: +lat,
    lng: +lng,
  };

  console.log(location);
  return (
    <Layout title="نتائح البحث">
      <SearchResultsHOC fallbackServices={services} fallbackPage={roomsPage} defaultLocation={location} service={service} minNightPrice={minNightPrice} maxNightPrice={maxNightPrice} />{" "}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

  const latitude = query.latitude;
  const longitude = query.longitude;
  const minNightPrice = query.minNightPrice;
  const maxNightPrice = query.maxNightPrice;
  const service = query.service;
  const pageNumber = query.pageNumber;

  try {
    const roomsPage = await fetcher(`/rooms?limit=16&${pageNumber ? `pageNumber=${pageNumber}` : `pageNumber=1`}${latitude ? `&latitude=${latitude}` : ""}${longitude ? `&longitude=${longitude}` : ""}${minNightPrice ? `&minNightPrice=${minNightPrice}` : ""}${maxNightPrice ? `&maxNightPrice=${maxNightPrice}` : ""}&${service ? `service=${service}` : ""}`);
    const servicesResponse = await axios.get("/services");
    const services = servicesResponse.data;
    return {
      props: {
        roomsPage,
        services,
      },
    };
  } catch (error: any) {
    console.log(error?.response.data.message);
    return {
      props: {},
    };
  }
};

export default SearchResults;
