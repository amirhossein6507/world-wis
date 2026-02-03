import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((el) => el.country).includes(cur.country)) {
      return [...arr, { country: cur.country, emoji: cur.emoji, id: cur.id }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
