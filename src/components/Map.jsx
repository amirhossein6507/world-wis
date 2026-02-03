import { useNavigate, useSearchParams } from "react-router";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        position:{lat} , {lng}
      </h2>
      <button onClick={() => setSearchParams({ lat: 20, lng: 30 })}>
        change position
      </button>
    </div>
  );
}

export default Map;
