import React from "react";
import moment from "moment";

const LiveClock = () => {
  const [value, setValue] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{moment(value).format("HH:mm:ss")}</>;
};

export default LiveClock;
