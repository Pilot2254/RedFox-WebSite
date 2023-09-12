function convert() {
    var scientificInput = document.getElementById("scientific").value;
    var decimalOutput = parseFloat(scientificInput);
    document.getElementById("result").innerHTML = decimalOutput;
  }
  