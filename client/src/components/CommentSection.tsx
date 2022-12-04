import React from 'react'
type CommentType={
    id:string|undefined,
    comments:string[] | undefined
}
const CommentSection = ({id,comments}:CommentType) => {
  return (
    <div>CommentSection</div>
  )
}

export default CommentSection