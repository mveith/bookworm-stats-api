const Utils = require("../utils");
const Goodreads = require("../goodreads");

export default (_req, res) => {
  Goodreads.withOauth(oauth => {
    oauth.getOAuthAccessToken(_req.query.token, _req.query.tokenSecret, null, function (q, oauth_token, oauth_token_secret, results) {
      Goodreads.withUser(_req, res, user => {
        Utils.corsResponse(_req, res, 200,
          {
            UserName: user.name,
            AccessToken: user.token,
            AccessTokenSecret: user.tokenSecret
          });
      }, oauth_token, oauth_token_secret);
    });
  });
};
