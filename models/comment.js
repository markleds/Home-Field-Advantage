const db = require('../config/database');
module.exports = {
  showComment(id) {
      return db.one(
        `
      SELECT *
      FROM comments
      WHERE id = $1
      `,
        id
      )
    },
    saveNewComment(comment) {
      return db.one(
        `
    INSERT INTO comments (
      username,
      category,
      comment_text,
      likes,
      stadium_id
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `, [
          comment.username,
          comment.category,
          comment.comment_text,
          comment.likes,
          comment.stadium_id,
        ])
    },
    updateLike(id) {
      return db.one(
        `
        UPDATE comments
        SET likes = likes + 1
        WHERE id = $1
        RETURNING *;
    `, [
          id
        ]);
    },
    updateComment(comment) {
      return db.one(
        `
        UPDATE comments
        SET username = $1,
            category = $2,
            comment_text = $3,
            likes = $4,
            stadium_id = $5
        WHERE id = $6
        RETURNING *;
    `, [
          comment.username, comment.category, comment.comment_text, comment
          .likes, comment.stadium_id, comment.id
        ]);
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
