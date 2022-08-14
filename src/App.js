import "./App.css";
import { useState } from "react";
import Papa from "papaparse";

function App() {
  const [showTable, setShowTable] = useState(false);
  const [models, setModels] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      complete: function (results) {
        console.log(results.data);

        let allData = results.data;
        let countsModel = [];
        allData.forEach((entry) => {
          let model = entry["Model"].toLowerCase().replace(/[^a-z0-9]/g, "");
          let foundModel = countsModel.find(
            (element) => element.model === model
          );
          if (foundModel) {
            foundModel.count += 1;
          } else {
            countsModel.push({ model: model, count: 1 });
          }
        });

        console.log(countsModel);

        countsModel = countsModel.sort((a, b) => b.count - a.count);

        let top3Models = countsModel.slice(0, 3);
        console.log(top3Models);

        setModels(top3Models);
        setShowTable(true);
      },
    });
  };

  return (
    <div>
      <h1>
        <span className="blue"></span>Bik<span className="blue"></span>
        <span className="yellow">EEE</span>
      </h1>
      <label className="custom-file-upload">
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
          className="custom-file-upload"
        />
      </label>
      {showTable ? (
        <table className="container">
          <thead>
            <tr>
              <th className="yellow">Top 3 models</th>
            </tr>
          </thead>
          <tbody>
            {models.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.model}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          <h2>Please upload CSV file using button above</h2>
        </div>
      )}
    </div>
  );
}

export default App;
