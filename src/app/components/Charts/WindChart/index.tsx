import moment from "moment";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Example = (response: any) => {
  const [data, setData] = useState<any>();

  useMemo(() => {
    setData(
      response?.response?.list?.slice(0, 5).map((item: any) => {
        return {
          date: moment(item.dt_txt).format("H:mm"),
          wind: item?.wind?.speed,
        };
      })
    );
  }, [response]);

  const labelFormatter = (value: any) => {
    return value + " km/h";
  };

  return (
    <div className="w-full h-full min-h-96 bg-white dark:bg-zinc-900  rounded-lg shadow-md">
      <h1 className="px-3 dark:text-white text-3xl ">Wind Speed</h1>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="w-full h-full min-h-96 bg-white dark:bg-zinc-900  rounded-lg shadow-md"
      >
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 30, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" unit={""} color="white" />
          <YAxis />
          <Tooltip formatter={(value: any) => labelFormatter(value)} />

          <Line type="monotone" dataKey="wind" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
