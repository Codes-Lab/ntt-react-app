import logo from './logo.svg';
import './App.css';
import PlotlyComponent from "./PlotlyComponent"
import {ExcelImportComponent} from "./ExcelImportComponent"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ExcelImportComponent></ExcelImportComponent>
      </header>
    </div>
  );
}

export default App;
