import React from 'react';
import Plot from "react-plotly.js"

function PlotlyComponent({xValues, yValues, peakValue}) {
    console.log({xValues}.xValues);
    console.log({yValues}.yValues);
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
                text: peakValue,
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