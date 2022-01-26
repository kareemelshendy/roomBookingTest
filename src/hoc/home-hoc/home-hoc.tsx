import React, { useEffect, useState } from "react";

import { HomeComponent } from "../../components/home/home";
import { useRooms } from "../../hooks/use-rooms.hook";
import InfiniteScroll from "react-infinite-scroll-component";
import { RoomPage } from "../../models";
import { useRouter } from "next/router";

export const HomeHOC = ({ fallbackPage }: { fallbackPage: RoomPage }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pageNumber: string = router.query.pageNumber as string;
  const { roomsPage, isLoading, isError } = useRooms(pageNumber, fallbackPage, "");

  return <HomeComponent rooms={roomsPage?.data} pageCount={roomsPage?.pageCount} isLoading={isLoading} />;
};
