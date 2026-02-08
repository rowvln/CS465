// app_server/controllers/travel.js
// Public site pulls trip data from REST API (Separation of Concerns)

const travel = async (req, res) => {
  const tripsEndpoint = 'http://localhost:3000/api/trips';
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(tripsEndpoint, options);

    // If API returns an error status, pass it through
    if (!response.ok) {
      return res.status(response.status).send(`API error: ${response.status}`);
    }

    const json = await response.json();

    // Guide-required extra error handling
    if (!Array.isArray(json)) {
      return res.status(500).send('API did not return an array of trips.');
    }
    if (json.length === 0) {
      return res.status(404).send('No trips found in the database.');
    }

    return res.render('travel', {
      title: 'Travlr Getaways',
      trips: json
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  travel
};
