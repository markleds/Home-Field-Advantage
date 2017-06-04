const db = require('../config/database');
module.exports = {
  findAllStadiums() {
      return db.manyOrNone(
        `
        SELECT *
        FROM teams
        INNER JOIN stadiums
        ON stadium_id = stadiums.id
        ORDER BY stadium_name
        ASC;
        `
      );
    },

    findNFLStadiums() {
      return db.manyOrNone(
        `
        SELECT *
        FROM teams
        INNER JOIN stadiums
        ON stadium_id = stadiums.id
        WHERE league = 'NFL'
        ORDER BY stadium_name
        ASC;
        `
      )
    },

    findMLBStadiums() {
      return db.manyOrNone(
        `
        SELECT *
        FROM teams
        INNER JOIN stadiums
        ON stadium_id = stadiums.id
        WHERE league = 'MLB'
        ORDER BY stadium_name
        ASC;
        `
      )
    },

    findAllComments(stadiumId) {
      return db.any(
        `
      SELECT *
      FROM stadiums
      INNER JOIN comments
      ON stadiums.id = comments.stadium_id
      WHERE stadiums.id = $1
      ORDER BY comments.date_created DESC
    `,
        stadiumId);
    },
    // findAllComments(stadiumId) {
    //   return db.any(
    //     `
    //   SELECT comments.id, username, category, comment_text, likes, comments.date_created, stadium_id, stadium_name, stadium_address, stadium_website, stadium_description, stadium_image_url FROM stadiums INNER JOIN comments ON stadiums.id = comments.stadium_id WHERE stadium_id = $1 ORDER BY comments.date_created DESC
    // `,
    //     stadiumId);
    // },
    // findStadium(stadiumId) {
    //   return db.any(
    //     `
    //   SELECT * FROM stadiums WHERE id = $1
    // `,
    //     stadiumId);
    // },
    // findAllComments(stadiumId) {
    //   return db.any(
    //     `
    //   SELECT * FROM comments WHERE stadium_id = $1 ORDER BY comments.date_created DESC
    // `,
    //     stadiumId);
    // },
    destroyComment(id) {
      return db.none(
        `
      DELETE
      FROM comments
      WHERE id = $1
    `, [id]);
    },

    sortCommentsLikes(stadiumId) {
      return db.any(
        `
        SELECT comments.id, username, category, comment_text, likes, comments.date_created, stadium_id, stadium_name, stadium_address, stadium_website, stadium_description, stadium_image_url FROM stadiums INNER JOIN comments ON stadiums.id = comments.stadium_id WHERE stadium_id = $1 ORDER BY likes DESC
        `,
        stadiumId);
    },

    filterCommentsCategory(stadiumId, category) {
      return db.any(
        `
        SELECT comments.id, username, category, comment_text, likes, comments.date_created, stadium_id, stadium_name, stadium_address, stadium_website, stadium_description, stadium_image_url
        FROM stadiums
        INNER JOIN comments
        ON stadiums.id = comments.stadium_id
        WHERE stadium_id = $1
        AND category = '$2'
        ORDER BY comments.date_created
        DESC
        `, [
          stadiumId, category
        ]);
    }

};

// saveNewComment(comment) {
//   return db.one(
//     `
//   INSERT INTO comments (
//     username,
//     category,
//     comment_text,
//     likes,
//     stadium_id
//   ) VALUES ($1, $2, $3, $4, $5)
//   RETURNING *;
// `, [
//       comment.username,
//       comment.category,
//       comment.comment_text,
//       comment.likes,
//       comment.stadium_id,
//     ])
// },
// updateLike(data, id) {
//   return db.one(
//     `
//   UPDATE comments
//   SET likes = $/comment/,
//   FROM comments
//   WHERE id = $1
// `, [
//       id
//     ]);
// },
