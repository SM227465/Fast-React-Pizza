interface Coordinate {
  latitude: number;
  longitude: number;
}

export const getAddress = async (coordinate: Coordinate) => {
  const { latitude, longitude } = coordinate;

  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  return data;
};
