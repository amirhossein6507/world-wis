import { useSearchParams } from "react-router";

const useLatLngUrl = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
};

export default useLatLngUrl;
