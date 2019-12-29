const Utils = require("../utils");
const Goodreads = require("../goodreads");

export default (_req, res) => {
  Goodreads.withOauth(oauth => {
    oauth.getOAuthRequestToken(function (q, oauth_token, oauth_token_secret, results) {
      Utils.corsResponse(_req, res, 200, {
        Url: "https://www.goodreads.com/oauth/authorize?oauth_token=" + oauth_token + "&oauth_callback=" + _req.query.clientSideUrl,
        Token: oauth_token,
        TokenSecret: oauth_token_secret
      });
    });
  });
};
