const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up Handlebars middleware
app.set("views", "views");
app.set("view engine", "hbs");
app.use(express.static("public"));

// Set up Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

//array for all the BMI calculations
const results = []

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/calculate', (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);
  const bmi = weight / Math.pow(height, 2);

let status;
if (bmi < 18.5) {
    status = 'Underweight';
  } else if (bmi < 25) {
    status = 'Normal';
  } else if (bmi < 30) {
    status = 'Overweight';
  } else {
    status = 'Obese';
  }

  results.push({ weight, height, bmi, status })
  res.render('result', { bmi, status });
});
app.get('/bmiResults', (req, res) => {
    const averageBmi = results.reduce((sum, result) => sum + result.bmi, 0) / results.length;
    res.render('bmiResults', { results, averageBmi });
  });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
