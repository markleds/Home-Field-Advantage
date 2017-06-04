$(document).ready(function() {

  // display form to create a new comment
  $('.new-comment-puck').on('click', function(event) {
    event.preventDefault();
    $('#new-comment-form').toggleClass('hidden');
  });

  const $newComment = $('#new-comment img');
  // $newComment.on('mouseenter', function() {
  //   $(this).attr('src', '/img/button-puck-2.png');
  // });
  // $newComment.on('mouseleave', function() {
  //   $(this).attr('src', '/img/button-puck-1.png');
  // });

  $('.update-comment').on('submit', function(event) {
    event.preventDefault();

    const username = $('#update-username').val(),
      category = $('.select-category').val(),
      comment_text = $('.update-text-area').val(),
      stadium_id = $('.comment-stadium-id').val(),
      likes = $('.update-likes').val(),
      id = $('.update-comment-id').val();

    const modifiedCommentData = {
      username: username,
      category: category,
      comment_text: comment_text,
      stadium_id: stadium_id,
      likes: likes,
      id: id
    };

    console.log(modifiedCommentData);

    $.ajax({
        method: 'PUT',
        url: `/stadiums/${stadium_id}/comments/${id}/update`,
        data: modifiedCommentData
      })
      .then((updatedComment) => {
        console.log(updatedComment);
        window.location.replace(
          `/stadiums/${stadium_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // hover affect for like heart and action for when it is clicked
  const $like = $('.like-heart');

  $like.on('mouseenter', function() {
    $(this).attr('src', '/img/like-heart-baseball-color.png');
  });
  $like.on('mouseleave', function() {
    $(this).attr('src', '/img/like-heart-baseball-bw.png');
  });
  $like.on('click', function() {
    $(this).attr('src', '/img/like-heart-baseball-color.png');
    $(this).off('mouseenter');
    $(this).off('mouseleave');
    // grab current values of comment
    const commentId = $(this).data('commentId');
    console.log(commentId);
    const stadiumId = $(this).data('stadiumId');
    console.log(stadiumId);

    $.ajax({
      method: 'PUT',
      url: `/stadiums/${stadiumId}/comments/${commentId}`,
      // data: {
      //   content: 1,
      // },
      success: (response) => {
        console.log('success');
        window.location.replace(`/stadiums/${stadiumId}`);
      },
      error: (err) => {
          console.log(err);
        } // ends ajax method
    }); // ends function to delete comment

  });


  const $trash = $('.trash-image');
  // Delete icon hover functionality
  $trash.on('mouseenter', function() {
    $(this).attr('src', '/img/trash-net-color.png');
  });
  $trash.on('mouseleave', function() {
    $(this).attr('src', '/img/trash-net-bw2.png');
  });

  // delete comment
  $('.trash').on('click', function(event) {
    const $commentId = $(this).data('commentId');
    const $stadiumId = $(this).data('stadiumId');

    let result = confirm(
      'Are you sure you want to delete this comment?');
    if (result) {

      $.ajax({
        method: 'DELETE',
        url: `/stadiums/${$stadiumId}/${$commentId}`,
        success: (response) => {
          console.log('success');
          window.location.replace(`/stadiums/${$stadiumId}`);
        },
        error: (err) => {
            console.log(err);
          } // ends ajax method
      }); // ends function to delete comment
    }
  });
  const $edit = $('.edit-image');
  const $modal = $('#modal');
  // Delete icon hover functionality
  $edit.on('mouseenter', function() {
    $(this).attr('src', '/img/edit-pencil-bat-color.png');
  });
  $edit.on('mouseleave', function() {
    $(this).attr('src', '/img/edit-pencil-bat-bw2.png');
  });

  // edit comment
  $edit.on('click', function(event) {

    const commentId = $(this).data('commentId');
    console.log(commentId);
    const stadiumId = $(this).data('stadiumId');
    console.log(stadiumId);

    // Get data from database to populate form to be edited
    $.ajax({
      method: 'GET',
      url: `/stadiums/${stadiumId}/comments/${commentId}`,
      success: function(comment) {
        console.log(comment);
        console.log(comment.username);
        // populate modal form values with ajax return
        $('#update-comment').attr('action',
          `/stadiums/${comment.stadium_id}/comments/${comment.id}/update?_method=put`
        )
        $('#update-username').attr('value', comment.username);
        $('#update-select-category').attr('value',
          comment.category);
        $('#update-text-area').html(comment.comment_text);
        $('#update-likes').attr('value', comment.likes);
        $('.update-comment-id').attr('value', comment.id);

        // display modal
        $modal.fadeIn();
      },
      error: (err) => {
          console.log(err);
        } // ends ajax method
    }); // ends function to delete comment
  });
  // cancel update - close modal
  $('.cancel-update').on('click', function() {
    $modal.fadeOut();
  });
  // update comment
  // const updateButton = $('#update');
  // $updateButton.on('click', function() {
  //   $modal.fadeOut();
  // });

});
