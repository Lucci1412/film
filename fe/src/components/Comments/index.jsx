import React, { useState, useEffect } from "react";
import Comment from "../Comment/index";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/userSlice";
import { publicRequest, userRequest } from "../../commons/api";
import "./style.scss";
function Comments({ movieId, parentId }) {
  const currentUser = useSelector(getUser);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    text: "",
    userId: currentUser?._id,
    movieId: movieId,
    parentId: parentId ? parentId : null,
  });
  const limit = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalComment, setTotalComment] = useState(0);
  const [totalCommentReply, setTotalCommentReply] = useState(0);
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = parentId
          ? await publicRequest.get(
              `comment/${movieId}?page=${currentPage}&limit=${limit}&parentId=${parentId}`
            )
          : await publicRequest.get(
              `comment/${movieId}?page=${currentPage}&limit=${limit}`
            );
        if (res.data.success) {
          setComments(res.data.comments);
          setTotalPage(res.data.total_page);
          parentId? setTotalCommentReply(res.data.total_comment): setTotalComment(res.data.total_comment);
         
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [currentPage,parentId,movieId]);
  const handleComment = async () => {
    try {
      const res = await userRequest.post(`/comment/`, commentForm);
      if (res.data.success) {
        setComments([res.data.comment, ...comments]);
        setCommentForm({
          text: "",
          userId: currentUser?._id,
          movieId: movieId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewMoreComment = async () => {
    try {
      const res = await publicRequest.get(
        `comment/${movieId}?page=${currentPage + 1}&limit=${limit}`
      );
      if (res.data.success) {
        setComments([...comments, ...res.data.comments]);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="comments">
      {!parentId && (
        <div className="comments-header">
          <span>{totalComment+totalCommentReply} bình luận</span>
          <span></span>
        </div>
      )}
      {!parentId && currentUser && (
        <div className="comments-input">
          <Avatar
            src={currentUser && currentUser.avatar}
            sx={{ width: 32, height: 32 }}
          />
          <div className="input">
            <input
              value={commentForm.text}
              onChange={(e) =>
                setCommentForm({ ...commentForm, text: e.target.value })
              }
              type="text"
              placeholder="Viết bình luận"
            />
            <SendIcon
              onClick={
                (commentForm.text.trim().length > 0) ? handleComment : undefined
              }
              htmlColor={commentForm.text.trim().length > 0 ? "#1976d2" : ""}
              className="icon"
            ></SendIcon>
          </div>
        </div>
      )}
      <div className="comments-list">
        {comments &&
          comments.map((comment, index) => {
            return <Comment key={index} total={totalCommentReply} comment={comment}></Comment>;
          })}
      </div>
      {currentPage < totalPage && (
        <span onClick={handleViewMoreComment}>Xem thêm bình luận</span>
      )}
      {(parentId && currentUser) && (
        <div className="comments-input">
          <Avatar
            src={currentUser && currentUser.avatar}
            sx={{ width: 32, height: 32 }}
          />
          <div className="input">
            <input
              value={commentForm.text}
              onChange={(e) =>
                setCommentForm({ ...commentForm, text: e.target.value })
              }
              type="text"
              placeholder="Viết bình luận"
            />
            <SendIcon
              onClick={
                (commentForm.text.trim().length > 0) ? handleComment : undefined
              }
              htmlColor={commentForm.text.trim().length > 0 ? "#1976d2" : ""}
              className="icon"
            ></SendIcon>
          </div>  
        </div>
      )}
    </div>
  );
}

export default Comments;
