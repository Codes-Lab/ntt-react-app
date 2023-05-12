import React from 'react';
import Plot from "react-plotly.js"

function PlotlyComponent({xValues, yValues, firstPeak, secondPeak}) {
    console.log({xValues}.xValues);
    console.log({yValues}.yValues);
    
    //Set the firstPeak and seconfPek to empty in case empty.
    if (secondPeak.length == 0) {
      secondPeak = "";
    }
    if (firstPeak.length == 0) {
      firstPeak = "";
    }

    return (
     <Plot
             data={[
               {
                 x: {xValues}.xValues,
                 y: {yValues}.yValues,
                 type: 'scatter',
                 mode: 'lines+markers',
                 marker: {color: 'black'}
               }
             ]}
             layout={{width: 900, height: 500, title: 'Dynamic Light Scattering',   
             xaxis: {
              title: 'raduis(nm)',
            }, 
            yaxis: {
              title: 'relative probability',
            },
            annotations: [
              {
                x: 1, 
                y: 1,
                text: firstPeak,
                showarrow: false,
                font: {
                  family: 'Arial',
                  size: 16,
                  color: 'blue',
                  
                },
                xref: 'paper',
                yref: 'paper',
                xanchor: 'right',
                yanchor: 'top'
              },
              {
                x: 1,
                y: 0.9,
                text: secondPeak,
                showarrow: false,
                font: {
                  family: 'Arial',
                  size: 16,
                  color: 'blue',
                },
                xref: 'paper',
                yref: 'paper',
                xanchor: 'right',
                yanchor: 'top'
              }
            ]}}
           />
    );
}

export default PlotlyComponent;