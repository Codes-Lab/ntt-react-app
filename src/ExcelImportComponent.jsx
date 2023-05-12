import react, {useState} from 'react';
import {useRef} from 'react';
import * as XLSX from 'xlsx';
import PlotlyComponent from "./PlotlyComponent";
import Plot from "react-plotly.js"

export const ExcelImportComponent = () => {
    const [xValues, setxValues] = useState([]);
    const [yValues, setyValues] = useState([]);
    const [firstPeak, setFirstPeak] = useState([]);
    const [secondPeak, setSecondPeak] = useState([]);
    const plotContainer = useRef(null);

    const handleFile = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                const data = await file.arrayBuffer();

                const dataRead = XLSX.read(data, {type: 'binary'});
                const wsName = dataRead.SheetNames[0];
                const ws = dataRead.Sheets[wsName];
                const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
                const xValues = dataParse.map(row => row[0]);
                const yValues = dataParse.map(row => row[1]);

                var topMax = -1;
                var topIndex = 0;
                var secondMax = -1;
                var secondIndex = 0;
                for (var i=1; i < yValues.length; i++) {
                    if (yValues[i] > yValues[i - 1] && yValues[i] > yValues[i + 1]) {
                        if (yValues[i] > topMax) {
                          secondIndex = topIndex;
                          secondMax = topMax;
                          topIndex = i;
                          topMax = yValues[i];
                        } else if (yValues[i] > secondMax) {
                          secondIndex = i;
                          secondMax = yValues[i];
                        }
                      }
                }
    
                setxValues(xValues);
                setyValues(yValues);
                var firstPeak = xValues[topIndex];
                var secondPeak = xValues[secondIndex];
                console.log("First Peak is " + firstPeak)
                console.log("Second Peak is " + secondPeak)
                setFirstPeak(firstPeak);
                setSecondPeak(secondPeak);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }    
    }


    function reset() {
        window.location.reload(false);
    }


    return (
        <>
            <div>
                <PlotlyComponent xValues={xValues} yValues={yValues} firstPeak={firstPeak} secondPeak={secondPeak}/>
            </div>
            <div>Please upload a distribution file: </div>
            <div className="input">
                <input type="file" accept="xlsx, xls" multiple={false} onChange={(e) => handleFile(e)}/>
            </div>
            <div className="button">
                <button className="button" onClick={reset}>Reset</button>
            </div>
           
        </>
    );
};