const Utils = require("../utils");
const Goodreads = require("../goodreads");

const mapBook = (value) => {
  const book = value.book[0];
  return {
    ReadData: value.read_at[0] && value.started_at[0] ? { ReadAt: new Date(value.read_at[0]), StartedAt: new Date(value.started_at[0]) } : null,
    NumPages: book.num_pages[0] ? parseInt(book.num_pages[0]) : 0,
    BookTitle: book.title[0],
    AuthorName: book.authors[0].author[0].name[0],
    ReviewId: parseInt(value.id[0]),
    Shelves: value.shelves[0].shelf.filter((s, i) => s.$.exclusive === "false").map((s, i) => s.$.name),
    SmallImageUrl: book.small_image_url[0],
    BookId: parseInt(book.id[0]._)
  };
};

export default (_req, res) => Goodreads.withUser(_req, res, user => {
  const url = Goodreads.reviewsUrl(user.id, user.consumerKey, _req.query.perPage, _req.query.page, "read", "title");
  Goodreads.oauthGetXml(res, url, user.token, user.tokenSecret, result => Utils.corsResponse(_req, res, 200,
    {
      Books: result.reviews[0].review.map((v, i) => mapBook(v))
    })
  );
});
