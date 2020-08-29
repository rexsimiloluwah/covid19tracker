import React from 'react'
import {Line} from 'react-chartjs-2'

const LineGraph = (props) => {

    return(
        <div
            style = {{
            }}
        >
            <Line data = {{
                labels: props.xAxisLabels.map( obj => {
                    return obj.substr(0,10)
                }),
                datasets: [
                  {
                    label: `Total Cases Chart for ${props.country} in ${props.days} days`,
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: '#ADD8E6',
                    borderColor: '#4e73df',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#4e73df',
                    pointBackgroundColor: '#4e73df',
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: props.yAxis
                  }
                ]
            }}>

            </Line>
        </div>
    )
}

export default LineGraph