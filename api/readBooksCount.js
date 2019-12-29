const Utils = require("../utils");
const Goodreads = require("../goodreads");

export default (_req, res) => {
  Goodreads.withUser(_req, res, user => {
    const url = Goodreads.reviewsUrl(user.id, user.consumerKey, 1, 1, "read", "title");
    Goodreads.oauthGetXml(res, url, user.token, user.tokenSecret, result => Utils.corsResponse(_req, res, 200,
      {
        Count: parseInt(result.reviews[0].$.total)
      })
    );
  });
};
