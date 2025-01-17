import "./styles.css";
import { useState } from "react";

// Build a component that books a one-way or return flight for specified dates.

const TODAY = formatDate(new Date());
const DAY_IN_SECONDS = 24 * 60 * 60 * 1000; // 24hrs in seconds

function formatDate(date) {
  const year = date.getFullYear();
  // The padStart() method of String values pads this string with another string (multiple times, if needed) until the resulting string reaches the given length
  // getMonth() - 0 to 11
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return [year, month, day].join("-");
}

export default function App() {
  const [flightOption, setFlightOption] = useState("one-way");
  const [departureDate, setDepartureDate] = useState(
    formatDate(new Date(Date.now() + DAY_IN_SECONDS)) // Tomorrow.
  );
  const [returnDate, setReturnDate] = useState(departureDate);

  return (
    <div>
      <form
        className="flight-booker"
        onSubmit={(event) => {
          event.preventDefault(); // Prevent default browser behaviour
          if (flightOption === "one-way") {
            alert(`You have booked a one-way flight on ${departureDate}`);
            return;
          }

          alert(
            `You have booked a return flight, departing on ${departureDate} and returning on ${returnDate}`
          );
        }}
      >
        <select
          value={flightOption}
          onChange={(event) => {
            setFlightOption(event.target.value);
          }}
        >
          <option value="one-way">One-way flight</option>
          <option value="return">Return flight</option>
        </select>
        <input
          aria-label="Departure date"
          type="date"
          value={departureDate}
          onChange={(event) => {
            setDepartureDate(event.target.value);
          }}
          min={TODAY}
        />
        {flightOption === "return" && (
          <input
            aria-label="Return date"
            type="date"
            value={returnDate}
            min={departureDate}
            onChange={(event) => {
              setReturnDate(event.target.value);
            }}
          />
        )}
        <button>Book</button>
      </form>
    </div>
  );
}
