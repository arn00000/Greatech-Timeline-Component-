import React from "react";
import ReactApexChart from "react-apexcharts";
import data from "./data.json";

let tempdata = [];
let colour = [];
let statusCircle = [];
let status = [];
const getdata = () => {
  data.map((datas) => {
    if (!statusCircle.includes(datas.colour)) {
      statusCircle.push(datas.colour);
      status.push(datas.status);
    }
    colour.push(datas.colour);
    tempdata.push({
      name: datas.name,
      data: [
        {
          x: datas.data[0].x,
          y: [
            new Date(datas.data[0].y[0]).getTime(),
            new Date(datas.data[0].y[1]).getTime(),
          ],
        },
      ],
    });
    return 0;
  });
};
getdata();
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: tempdata,
      options: {
        chart: {
          height: 350,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50%",
            rangeBarGroupRows: true,
            borderRadius: 0,
            // rangeBarOverlap: false,
            // rangeBarGroupRows: false,
          },
        },
        colors: colour,
        fill: {
          type: "solid",
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeUTC: false,
          },
        },
        legend: {
          position: "right",
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            var data =
              w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            var name = w.config.series[seriesIndex].name;
            let time1 = data.y[0];
            let time2 = data.y[1];
            var diffMs = Math.abs(time1 - time2); // milliseconds between two dates
            var diffDays = Math.floor(diffMs / 86400000); // days
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            var diffSecs = Math.round(
              (((diffMs % 86400000) % 3600000) % 60000) / 1000
            ); // seconds
            var timeDiff =
              diffDays +
              " days, " +
              diffHrs +
              " hours, " +
              diffMins +
              " mins " +
              diffSecs +
              " sec ";

            let startDate = new Date(data.y[0]);
            let endDate = new Date(data.y[1]);

            // startDate = startDate.toUTCString();
            // endDate = endDate.toUTCString();
            return (
              "<ul>" +
              "<li><b>Name</b>: " +
              data.x +
              "</li>" +
              "<li><b>Start Date</b>: " +
              startDate +
              "</li>" +
              "<li><b>End Date</b>: " +
              endDate +
              "</li>" +
              "<li><b>Time Different</b>: '" +
              timeDiff +
              "</li>" +
              "<li><b>Status</b>: " +
              name +
              "</li>" +
              "</ul>"
            );
          },
        },
      },
    };
  }

  render() {
    return (
      <>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="rangeBar"
            height={500}
          />
        </div>
        <div className="status-color">
          {statusCircle.map((data, i) => {
            return (
              <p key={i}>
                <span
                  className="dot"
                  style={{ backgroundColor: statusCircle[i] }}
                ></span>
                {status[i]}
              </p>
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
