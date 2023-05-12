import react, { useState } from 'react';
import * as XLSX from 'xlsx';
import PlotlyComponent from "./PlotlyComponent";

export const ExcelImportComponent = () => {
    const [xValues, setxValues] = useState([]);
    const [yValues, setyValues] = useState([]);
    const [peakValue, setPeakValue] = useState([]);

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
                var max = 0;
                var index = 0;
                for(var i=0; i < yValues.length; i++){
                    if(yValues[i] > max) {
                        max = yValues[i];
                        index = i;
                        console.log("set peak to " + max)
                        }
                    }
                
                console.log("Peaks are " + max);
                console.log("Peak indexes are" + index);
                setxValues(xValues);
                setyValues(yValues);
                var peak = max + ',' + xValues[index];
                console.log("Peak is " + peak)
                setPeakValue(peak);
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
                <PlotlyComponent xValues={xValues} yValues={yValues} peakValue={peakValue}/>
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