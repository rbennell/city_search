import React from "react";

const CitiesTable = ({ cities: cityData, total }) =>
  console.log(cityData) || (
    <div>
      <p>
        Total cities found: <b>{total}</b>
      </p>
      <table>
        {Object.entries(cityData).map(([state, cities]) => (
          <tr>
            <td>{state}</td>
            {cities.map((city) => (
              <td>{city}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
export default CitiesTable;
