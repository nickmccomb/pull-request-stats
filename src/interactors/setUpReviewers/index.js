const getContributions = require('./getContributions');
const calculateTotals = require('./calculateTotals');
const sortByStats = require('./sortByStats');

module.exports = ({
  sortBy,
  reviewers,
  limitTop,
  limitBottom,
}) => {
  const allStats = reviewers.map((r) => r.stats);
  const totals = calculateTotals(allStats);
  const sorted = sortByStats(reviewers, sortBy).map((reviewer) => ({
    ...reviewer,
    contributions: getContributions(reviewer, totals),
  }));

  // // get top and bottom limits (if user set this as a param)
  const top = sorted.slice(0, limitTop);
  const bottom = sorted.slice(-limitBottom);

  // only show top X and bottom X reviewers (also removes duplicates if there are any)
  if (limitTop && limitBottom) {
    return [...new Set([...top, ...bottom])];
  }

  // only show top X reviewers
  if (limitTop) return top;

  // only show bottom X reviewers
  if (limitBottom) return bottom;

  // show all reviewers
  return sorted;
};
