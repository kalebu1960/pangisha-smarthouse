import api from "./axios";

/**
 * Get all properties
 */
export async function fetchProperties(params = {}) {
  try {
    const response = await api.get("/properties", {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch properties"
    );
  }
}

/**
 * Get one property
 */
export async function fetchProperty(id) {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Property not found"
    );
  }
}

/**
 * Get landlord properties
 */
export async function fetchMyProperties() {
  const response = await api.get("/my-properties");
  return response.data;
}

/**
 * Delete property
 */
export async function deleteProperty(id) {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
}

export async function createProperty(property) {
  const response = await api.post("/properties", property);
  return response.data;
}