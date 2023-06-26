import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail = () => {
  const reviews = useSelector((state) => {
    return state.review;
  });

  const [review, setReview] = useState("");

  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);

  const todo = todos.filter((todo) => todo.id === id)[0];

  return (
    <div>
      {todo.id}
      <br />
      {todo.title}
      <br />
      {todo.body}
      <br />
      {todo.isDone.toString()}
      <br />
      <button onClick={() => navigate("/")}>이전 화면으로</button>
      <p>댓글</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          dispatch({
            type: "ADD_REVEIW",
            payload: {
              id: shortid.generate(),
              review: review,
            },
          });

          setReview("");
        }}
      >
        <input
          type="text"
          value={review}
          onChange={(event) => {
            setReview(event.target.value);
          }}
        />
        <button>작성</button>
      </form>
      <div>댓글목록</div>
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            {review.review}
            <button>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default Detail;
