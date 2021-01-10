import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Comparison() {
  const [options, setOptions] = useState({
    title: {
      text: "萬壽橋測站與寶橋橋測站 河川污染指數 (RPI) 測項 歷史趨勢比較圖 (2019/01~2020/10)",
    },
    chart: {
        type: 'column'
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
        text: "mg/L",
      },
    },
    series: [{
        name: '萬壽橋測站',
        data: []
    }, {
        name: '寶橋橋測站',
        data: []
    }],
    });

  useEffect(async () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization:
        "ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImJ6QnFGWTBaeCIsIm9yZ0lkIjoiSk9FOEVnNFgzIiwidXNlcklkIjpudWxsLCJyb2xlIjpudWxsLCJ0eXBlIjoiQXBpS2V5Iiwic2NvcGVzIjpbXSwiaWF0IjoxNjA4MTk4ODY2LCJqdGkiOiIwWlNndVJUNUsifQ.UXsafM1cLLgu4SmGIYQoVzK6jdKruz-vv3U46pJqzaY",
    };

    const WanShouResult = await fetch(
      "https://api.paas.oringnet.cloud/v4/things/syjmHv7z-/data-buckets/sensorData/timeline?&dataShapes=fullDataPackt&limit=20",
      {headers,}
    ).then(response => response.json())
    .then(data => {
      return data.data;
    });

    const BaoqiaoResult = await fetch(
      "https://api.paas.oringnet.cloud/v4/things/syjmHv7z-/data-buckets/sensorData2/timeline?&dataShapes=fullDataPackt&limit=20",
      {headers,}
    ).then(response => response.json())
    .then(data => {
      return data.data;
    });

    const sortedResult = [
      {
        name: '萬壽橋測站',
        data: [6, 4, 2]
      }, {
          name: '寶橋橋測站',
          data: [8, 4, 3]
      }
    ];

    WanShouResult.forEach((item) => {
      const DO = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).DO);
      const BOD = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).BOD);
      const SS = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).SS);
      const Nitrogen = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).Nitrogen);
      sortedResult[0].data.push((DO+BOD+SS+Nitrogen)/4);
    });

    BaoqiaoResult.forEach((item) => {
      const DO = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).DO);
      const BOD = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).BOD);
      const SS = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).SS);
      const Nitrogen = parseFloat(JSON.parse(item.values[0].value.replace(/'/g, '"')).Nitrogen);
      sortedResult[1].data.push((DO+BOD+SS+Nitrogen)/4);
    });

    setOptions({ series: sortedResult });
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

export default Comparison;
