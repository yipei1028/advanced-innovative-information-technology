import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Wanshou() {
  const [options, setOptions] = useState({
    title: {
      text: "萬壽橋測站 河川污染指數 (RPI) 測項 歷史趨勢圖 (2019/01~2020/10)",
    },
    xAxis: {
      categories: [
        "2019/01",
        "2019/02",
        "2019/03",
        "2019/04",
        "2019/05",
        "2019/06",
        "2019/07",
        "2019/08",
        "2019/09",
        "2019/10",
        "2019/11",
        "2019/12",
        "2020/01",
        "2020/02",
        "2020/03",
        "2020/04",
        "2020/05",
        "2020/06",
        "2020/07",
        "2020/08",
        "2020/09",
        "2020/10",
      ],
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: [],
  });


  useEffect(async () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization:
        "ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImJ6QnFGWTBaeCIsIm9yZ0lkIjoiSk9FOEVnNFgzIiwidXNlcklkIjpudWxsLCJyb2xlIjpudWxsLCJ0eXBlIjoiQXBpS2V5Iiwic2NvcGVzIjpbXSwiaWF0IjoxNjA4MTk4ODY2LCJqdGkiOiIwWlNndVJUNUsifQ.UXsafM1cLLgu4SmGIYQoVzK6jdKruz-vv3U46pJqzaY",
    };

    const result = await fetch(
      "https://api.paas.oringnet.cloud/v4/things/syjmHv7z-/data-buckets/sensorData/timeline?&dataShapes=fullDataPackt&limit=20",
      {headers,}
    ).then(response => response.json())
    .then(data => {
      return data.data;
    });

    const sortedResults = [
      {
        name: "溶氧量(mg/L)",
        data: []
      },
      {
        name: "生化需氧量(mg/L)",
        data: [],
      },
      {
        name: "懸浮固體(mg/L)",
        data: [],
      },
      {
        name: "氨氮(mg/L)",
        data: [],
      },
    ]

    result.forEach((item) => {
      const DO = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).DO);
      const BOD = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).BOD);
      const SS = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).SS);
      const Nitrogen = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).Nitrogen);

      sortedResults[0].data.push(DO);
      sortedResults[1].data.push(BOD);
      sortedResults[2].data.push(SS);
      sortedResults[3].data.push(Nitrogen);
    });

    setOptions({ series: sortedResults });
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

export default Wanshou;
