/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useLatLngUrl from "../hooks/useLatLngUrl";

function Map() {
  const { currentCity, cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingLocation,
    getPosition,
    position: geoLoactionPosition,
  } = useGeolocation();

  const [lat, lng] = useLatLngUrl();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLoactionPosition)
      return setMapPosition([geoLoactionPosition.lat, geoLoactionPosition.lng]);
  }, [geoLoactionPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingLocation ? "Loading..." : "Your Location"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
        <ChengeCenter position={mapPosition} />
        <EventMap />
      </MapContainer>
    </div>
  );
}

function ChengeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function EventMap() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
