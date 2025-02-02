const { durationToString } = require('../../../utils');

const MEDALS = [
  ':first_place_medal:',
  ':second_place_medal:',
  ':third_place_medal:',
]; /* 🥇🥈🥉 */

const getUsername = ({ index, reviewer, displayCharts }) => {
  const { login, avatarUrl } = reviewer.author;

  const medal = displayCharts ? MEDALS[index] : null;
  const suffix = medal ? ` ${medal}` : '';

  return {
    type: 'context',
    elements: [
      {
        type: 'image',
        image_url: avatarUrl,
        alt_text: login,
      },
      {
        emoji: true,
        type: 'plain_text',
        text: `${login}${suffix}`,
      },
    ],
  };
};

const getStats = ({ t, reviewer }) => {
  const { stats } = reviewer;
  const timeToReviewStr = durationToString(stats.timeToReview);

  return {
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: `*${t('table.columns.totalReviews')}:* ${stats.totalReviews}`,
      },
      {
        type: 'mrkdwn',
        text: `*${t('table.columns.totalComments')}:* ${stats.totalComments}`,
      },
      {
        type: 'mrkdwn',
        text: `*${t('table.columns.timeToReview')}:* ${timeToReviewStr}`,
      },
    ],
  };
};

const getDivider = () => ({
  type: 'divider',
});

module.exports = ({
  t,
  index,
  reviewer,
  displayCharts,
}) => [
  getUsername({ index, reviewer, displayCharts }),
  getStats({ t, reviewer }),
  getDivider(),
];
