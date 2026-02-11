// "https://api.bigdatacloud.net/d/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router";
import ButtonBack from "./ButtonBack";
import useLatLngUrl from "../hooks/useLatLngUrl";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createdNewCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const [lat, lng] = useLatLngUrl();
  const navigate = useNavigate();

  // console.log(lat, lng);

  useEffect(() => {
    const fetchCity = async () => {
      setIsLoadingForm(true);
      try {
        setErrorForm("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("please click somewher😉");
        setCityName(data.cityName || data.locality || "");
        setCountry(data.countryNamd);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setErrorForm(error.message);
      } finally {
        setIsLoadingForm(false);
      }
    };
    fetchCity();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createdNewCity(newCity);
    navigate("/app/cities");
  };

  if (isLoadingForm) return <Spinner />;

  if (errorForm) return <Message message={errorForm} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(e) => setDate(e)}
          selected={date}
          dateFormat={"yyyy/MM/dd"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          style={{ resize: "none" }}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
