import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchWeather = async (lat: any, lon: any): Promise<any> => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_BASE_API_URL}&units=metric`
  );

  const resp1 = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=americana&appid=${process.env.NEXT_PUBLIC_BASE_API_URL}`
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
    staleTime: 1000 * 60 * 3,
  });
};

export default useWeather;
