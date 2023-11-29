import { useEffect, useState } from "react"

export default function App() {
  const [country, setCountry] = useState("Australia");
  const [countryDetails, setCountryDetails] = useState([]);

  useEffect(function() {
    async function fetchCountries() {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

        if (!res.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Country not found");
        }

        setCountryDetails(data[0]);

      } catch(err) {
        console.log("There's an error", err);
      }
    }

    fetchCountries();
  }, [country]);

  return (
    <>
      <Form country={country} setCountry={setCountry} />
      <Country countryDetails={countryDetails} />
    </>
  )
}

function Form({ country, setCountry }) {
  return (
    <form>
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="India..." />
      <button>Submit</button>
    </form>
  )
}

function Country({ countryDetails }) {
  const borders = countryDetails.borders ? countryDetails.borders.map((border) => border) : null;
  const population = countryDetails.population;

  return (
    <div>
      <img src={countryDetails.flags?.png} alt="countres flag" />
      <p>{countryDetails.altSpellings}</p>
      <span>Population: {population}</span>
      <ul key={countryDetails}>{borders ? borders.map((border, i) => <li key={i}>{border}</li>) : "This country has no borders."}</ul>
    </div>
  )
}