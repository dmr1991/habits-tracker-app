export const fetchHabits = async (token: string) => {
  const response = await fetch("http://localhost:5000/habits", {
    headers: { Authorization: "Bearer " + token },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch habits.");
  }
  return response.json();
};

export const fetchAddHabit = async (
  token: string,
  title: string,
  description: string
) => {
  const response = await fetch("http://localhost:5000/habits", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, description: description }),
  });
  if (!response.ok) {
    throw new Error("Failed to add new habit.");
  }
  return response;
};
