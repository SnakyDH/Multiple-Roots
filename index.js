document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const resultsTable = document.getElementById("resultsTable");
    const bodyTable = document.getElementById("bodyTable");
    const initValue = document.getElementById("initial-value");
    const errorRate = document.getElementById("errorRate");
    let xCurrent = initValue.value; // xCurrent = xi
    let error = errorRate.value;
    // F(x) = x^3-5x^2+7x-3
    function calcFx(xi) {
      return Math.pow(xi, 3) - 5 * Math.pow(xi, 2) + 7 * xi - 3;
    }
    // F(x)' = 3x^2-10x+7
    function calcFx1(xi) {
      return 3 * Math.pow(xi, 2) - 10 * xi + 7;
    }
    //F(x)' = 6x-10
    function calcFx2(xi) {
      return 6 * xi - 10;
    }
    //xiNext xi+1
    //Xi+1
    function calcXNext(x1) {
      return (
        x1 -
        (calcFx(x1) * calcFx1(x1)) /
          (Math.pow(calcFx1(x1), 2) - (calcFx(x1) * calcFx2(x1)))
      );
    }
    // errorP = (xi-xi-1)/xi 
    function calcEP(xC, xB) {
      return Math.abs((xC - xB) / xC) * 100;
    }
    let errorCurrent = 1; // 100%
    let i = 1; //Iteraciones
    let xBefore = 0; //x Anterior
    while (errorCurrent >= error) {
      console.log("Iteracion N°", i); // Number of Iterations
      calcFx(xCurrent); //Evaluate in Fx
      calcFx1(xCurrent); //Evaluate in Fx'
      calcFx2(xCurrent); // Evaluate in Fx''
      if (i !== 1) {
      errorCurrent = calcEP(xCurrent, xBefore); // Calculate error
      }
      xNext = calcXNext(xCurrent); // Calculate xNext
      xBefore = xCurrent; // Assign xCurrent to xBefore 
      xCurrent = xNext; // Assign xNext to x Current
      createRow(i,xCurrent,calcFx(xCurrent),calcFx1(xCurrent),calcFx2(xCurrent),errorCurrent);
      i++;
    }
    // Results Table
    function createRow(i,xi, fx, fx1,fx2,error){
      let newTableRow = resultsTable.insertRow(-1);
      let newTableCell = newTableRow.insertCell(0);
      newTableCell.textContent = `${i}`
      newTableCell = newTableRow.insertCell(1);
      newTableCell.textContent = `${xi}`
      newTableCell = newTableRow.insertCell(2);
      newTableCell.textContent = `${fx}`
      newTableCell = newTableRow.insertCell(3);
      newTableCell.textContent = `${fx1}`
      newTableCell = newTableRow.insertCell(4);
      newTableCell.textContent = `${fx2}`
      newTableCell = newTableRow.insertCell(5);
      newTableCell.textContent = `${error}`

    }
  });
});
