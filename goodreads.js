export function withOauth(callback) {
    const OAuth = require('oauth');
    const oauth = new OAuth.OAuth(
        'https://www.goodreads.com/oauth/request_token',
        'https://www.goodreads.com/oauth/access_token',
        process.env.CONSUMER_KEY,
        process.env.CONSUMER_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    callback(oauth);
}

function processXml(res, xml, error, callback) {
    if (error) {
        res.status(300).send(JSON.stringify(error));
    }
    else {
        const parseString = require('xml2js').parseString;
        parseString(xml, { explicitRoot: false }, function (err, result) {
            if (err) {
                res.status(300).send(JSON.stringify(err));
            }
            else {
                callback(result);
            }
        });
    }
}

export function withUser(req, res, callback, token = null, tokenSecret = null) {
    withOauth(oauth =>
        oauth.get(
            'https://www.goodreads.com/api/auth_user',
            token ? token : req.query.token,
            tokenSecret ? tokenSecret : req.query.tokenSecret,
            (e, data, _) => processXml(res, data, e, r => callback({
                id: r.user[0].$.id,
                name: r.user[0].name[0],
                token: token ? token : req.query.token,
                tokenSecret: tokenSecret ? tokenSecret : req.query.tokenSecret,
                consumerKey: oauth._consumerKey
            }))));
}

export function oauthGetXml(res, url, token, tokenSecret, callback) {
    withOauth((oauth) =>
        oauth.get(url, token, tokenSecret, (e, data, _) => processXml(res, data, e, callback)));
}

export function reviewsUrl(userId, consumerKey, perPage, page, shelf, sort) {
    return "https://www.goodreads.com/review/list/" + userId + ".xml?key=" + consumerKey + "&v=2&shelf=" + shelf + "&sort=" + sort + "&per_page=" + perPage + "&page=" + page;
}