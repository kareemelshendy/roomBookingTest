import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { SearchMap } from "../mapSearch/mapSearch";
import styles from "./readOnlyMap.module.scss";

interface Props {
  location: any | undefined;
  borderRadius: string;
  search?: boolean;
}

export const ReadOnlyMap = ({ search, borderRadius, location }: Props) => {
  const mapRef = useRef();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBd5xK1yOFExAuA_M_oHAlQqcHTzc5b8NA",
  });
  const center = {
    lat: location ? location[1] : "",
    lng: location ? location[0] : "",
  };
  const options = {
    disableDefaultUI: true,
    // zoomControl: true,
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <>
      <GoogleMap center={center} zoom={8} options={options} onLoad={onMapLoad} mapContainerClassName={`${styles.map} ${borderRadius}`}>
        {search && (
          <>
            <button className={styles.search} type="submit">
              <i className="fas fa-search"></i>
            </button>
            <SearchMap />
          </>
        )}

        <Marker position={{ lat: location ? location[1] : 0, lng: location ? location[0] : 0 }} />

        {/* {selected ? (
          <InfoWindow
            position={{ lat: selected?.lat, lng: selected?.lng }}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div>
              <h2>Room Spotted!</h2>
              <p>spotted {formatRelative(selected?.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null} */}
        {/* {button && (
          <div className={styles.bottom}>
            <div className={styles.location}>
              <h2 className="heading heading-4 heading-darkGrey">العين السخنة كمباوند أروما الكيلو 39</h2>
              <i className="fas fa-map-marker-alt"></i>
            </div>

            <Button btnPrimary="btn-primary" width="w-50" onClick={confirmHandler}>
              تأكيد
            </Button>
          </div>
        )} */}
      </GoogleMap>
    </>
  );
};
