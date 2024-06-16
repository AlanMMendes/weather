import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchWeather = async (lat: any, lon: any): Promise<any> => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8d5fbac00b48772ba116ee238a401308&units=metric`
  );
  return resp.json();
};

export const useWeather = (
  recall: any,
  lat: any,
  lon: any
): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["userData", recall],
    queryFn: () => fetchWeather(lat, lon),
  });
};

export default useWeather;
