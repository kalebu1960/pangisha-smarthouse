import { useParams} from "reactrouter-dom";
import { useState, useEffect } from "react";

export default function PropertyDetails() {
   const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/KES{id}`)
      .then(response => response.json())
      .then(data => setProperty(data))
      .catch(error => console.error("Error fetching property details:", error));
  }, [id]);

  if (!property) {
    return <h2>loading...</h2>;
  }
  return (
    <div>
      <h1>Property Details</h1>
      <img src={property.image_url} alt={property.name} />

      <h3>location</h3>
      <p>{property.location}</p>

      <h3>Rent</h3>
      <p>KES {property.rent}</p>

      <h3>Amenities</h3>
      <ul>
        {property.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
}