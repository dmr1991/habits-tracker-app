export const fetchHabits = async () => {
  const response = await fetch("http://localhost:5000/habits");
  if (!response.ok) {
    throw new Error("Failed to fetch habits.");
  }
  return response.json();
};
