const reviewers = require('../../__tests__/mocks/reviewersWithStats.json');
const setUpReviewers = require('../index');

describe('Interactors | .setUpReviewers', () => {
  it('adds contributions to each reviewer', () => {
    const response = setUpReviewers({ reviewers });
    expect(response.length).toEqual(reviewers.length);

    response.forEach((reviewer) => {
      expect(reviewer).toHaveProperty('contributions');
    });
  });

  it('applies limitTop option', () => {
    const limitTop = 1;
    const response = setUpReviewers({ reviewers, limitTop });
    expect(response.length).toEqual(limitTop);
  });

  it('applies limitBottom option', () => {
    const limitBottom = 1;
    const response = setUpReviewers({ reviewers, limitBottom });
    expect(response.length).toEqual(limitBottom);
  });

  it('applies sort option', () => {
    const sortBy = 'COMMENTS';
    const response = setUpReviewers({ reviewers, sortBy });
    const actualOrder = response.map((reviewer) => reviewer?.author?.login);
    const expectedOrder = ['user2', 'user1'];
    expect(actualOrder).toEqual(expectedOrder);
  });
});
