import { useQuery, UseQueryResult } from "@tanstack/react-query";

export default function useWeather(
  lat: any,
  lon: any,
  recall: any
): UseQueryResult<any> {
  return useQuery({
    queryKey: ["user-data", recall],
    queryFn: async () => {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_BASE_API_URL}&units=metric`
      );
      return resp.json();
    },
  });
}
