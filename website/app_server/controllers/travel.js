/**
 * travel.js (controller)
 *
 * Controller for the Travel page.
 * Handles preparing data and rendering the view using Handlebars.
 */

const travelList = (req, res) => {
  /**
   * Categories displayed as tabs on the Travel page.
   */
  const categories = ["Beaches", "Cruises", "Mountains"];

  /**
   * Sample trip data used for Module Two.
   * This will later be replaced with database-driven data.
   */
  const trips = [
    {
      id: "TR001",
      name: "Bahamas Escape",
      length: "7 days",
      start: "2026-03-15",
      resort: "OceanView",
      perPerson: 1299,
      category: "Beaches",
    },
    {
      id: "TR002",
      name: "Alaskan Cruise",
      length: "10 days",
      start: "2026-06-02",
      resort: "NorthStar",
      perPerson: 2199,
      category: "Cruises",
    },
    {
      id: "TR003",
      name: "Rocky Mountain Trek",
      length: "5 days",
      start: "2026-04-20",
      resort: "PineLodge",
      perPerson: 999,
      category: "Mountains",
    },
  ];

  /**
   * Calculate how many trips exist per category.
   * These values are shown next to each category tab.
   */
  const tripCounts = {
    Beaches: trips.filter((t) => t.category === "Beaches").length,
    Cruises: trips.filter((t) => t.category === "Cruises").length,
    Mountains: trips.filter((t) => t.category === "Mountains").length,
  };

  /**
   * Determine the selected category from the query string.
   * Defaults to "Beaches" when no category is provided.
   */
  const selectedCategory = req.query.category || "Beaches";

  /**
   * Filter trips based on the selected category.
   */
  const filteredTrips = trips.filter(
    (trip) => trip.category === selectedCategory
  );

  /**
   * Render the Travel page and pass all required data to the view.
   */
  res.render("travel", {
    title: "Travlr Getaways - Travel",
    year: new Date().getFullYear(),
    categories,
    tripCounts,
    selectedCategory,
    trips: filteredTrips,
  });
};

module.exports = {
  travelList,
};
