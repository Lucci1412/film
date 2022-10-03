import React from 'react'
import Comments from '../Comments'
import './style.scss'
function CommentReply({parentId}) {
  return (
    <div className='comment-reply'>
      <Comments parentId={parentId}></Comments>
    </div>
  )
}

export default CommentReply