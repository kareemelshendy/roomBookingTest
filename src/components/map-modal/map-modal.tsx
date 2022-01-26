import { useCallback, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../button/button";
import { Map } from "../map/map";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";

import styles from "./map-modal.module.scss";

export const MapModal = ({ showMap, setShowMap, setLocation, location }: any) => {
  // const [selected, setSelected] = useState<any>(null)
  const mapRef = useRef();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBd5xK1yOFExAuA_M_oHAlQqcHTzc5b8NA",
  });

  const center = {
    lat: 31.257111,
    lng: 32.295341,
  };

  const options = {
    disableDefaultUI: true,
    // zoomControl: true,
  };

  const onMapClick = useCallback((event: any) => {
    setLocation((location: any) => {
      return { lat: event.latLng?.lat(), lng: event.latLng?.lng() };
    });
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <Modal show={showMap} onHide={() => setShowMap(false)} dialogClassName="map_modal">
      <Modal.Body>
        {loadError && <div>ErrorLoadmaps</div>}
        {!isLoaded && <div>Loading Maps</div>}

        {!loadError && isLoaded && (
          <GoogleMap
            center={center}
            zoom={8}
            options={options}
            onClick={(event) => {
              onMapClick(event);
            }}
            onLoad={onMapLoad}
            mapContainerClassName={`${styles.map}`}
          >
            <button className={styles.search} type="submit">
              <i className="fas fa-search"></i>
            </button>
            {/* <SearchMap /> */}

            <Marker
              position={{ lat: +location.lat, lng: +location.lng }}
              // onClick={() => {
              //   // setSelected(marker)
              // }}
            />

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
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="location">
          <p>العين السخنة كمباوند أروما الكيلو 39</p>
          <i className="fas fa-map-marker-alt"></i>
        </div>

        <div className="button">
          <Button
            btnPrimary="btn-primary"
            width="w-100"
            onClick={() => {
              setShowMap(false);

              console.log(location);
            }}
          >
            تأكيد
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
