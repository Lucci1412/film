import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import {
  FavoriteBorder,
  Favorite,
  Flag,
  CommentOutlined,
} from "@mui/icons-material";
import { messageFail, messageSuccess } from "../../commons";
import { publicRequest, userRequest } from "../../commons/api";
import CommentReply from "../CommentReply";
import { getUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import "./style.scss";
function Comment({ comment, total }) {
  const currentUser = useSelector(getUser);
  const [user, setUser] = useState(null);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [isLike, setIsLike] = useState(
    comment.like.includes(currentUser?._id || false)
  );
  const [countLike, setCountLike] = useState(comment.like.length);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get(`/user/${comment?.userId}`);
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  const handleLikeComment = async () => {
    try {
      if (currentUser) {
        const res = await userRequest.put(`/comment/like/${comment._id}`, {
          userId: currentUser._id,
        });
        if (res.data.success) {
          isLike ? setCountLike(countLike - 1) : setCountLike(countLike + 1);
          setIsLike(!isLike);
        }
      } else {
        messageFail("Đăng nhập để thực hiện thao tác");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReport = async () => {
    if (currentUser) {
      messageSuccess("Tính năng đang được nâng cấp");
    } else {
      messageFail("Đăng nhập để thực hiện thao tác");
    }
  };
  return (
    <div className="comment">
      <Avatar src={user && user.avatar} sx={{ width: 32, height: 32 }} />
      <div className="comment-info">
        <h4>{user && user.username}</h4>
        <span>{comment.text}</span>
        <div className="comment-widget">
          <div className="item">
            {isLike ? (
              <Favorite
                onClick={handleLikeComment}
                htmlColor="#e61844"
                className="icon"
                fontSize="small"
              ></Favorite>
            ) : (
              <FavoriteBorder
                onClick={handleLikeComment}
                className="icon"
                fontSize="small"
              ></FavoriteBorder>
            )}

            <span>{countLike}</span>
          </div>
          {!comment.parentId && (
            <div className="item">
              <CommentOutlined
                onClick={() => setShowReplyComment(!showReplyComment)}
                className="icon"
                fontSize="small"
              ></CommentOutlined>
              <span>{total}</span>
            </div>
          )}
          <div className="item">
            <Flag
              onClick={handleReport}
              className="icon"
              fontSize="small"
            ></Flag>
          </div>
        </div>
        {showReplyComment && (
          <CommentReply movieId={comment.movieId} parentId={comment._id} />
        )}
      </div>
    </div>
  );
}

export default Comment;
