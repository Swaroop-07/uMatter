import "./BlogCard.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Cookies from "js-cookie";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { getActiveState, getBlog } from "../../store/authStore.js";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../assets/images/Avatar.png";
import CryptoJS from "crypto-js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Logo from "../../assets/images/icon.png";
const BlogCard = () => {
  const [backendData, setBackendData] = useState([]);
  const [filteredSearch, filteredSearchResults] = useState([]);
  const [searchValue, findSearchTerm] = useState("");
  const [visibleList, setVisibleList] = useState(6);
  const [selectedBlogtobeDeleted, setBlogDeleted] = useState();
  const [selectedBlogtobeUpdate, setBlogUpdated] = useState();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [form, setForm] = useState();
  const handleClickOpen = (id) => {
    setBlogDeleted(id);
    setOpen(true);
  };
  const handleClickOpenUpdate = (i) => {
    setForm(i);
    setOpenUpdate(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const secretPass = "XkhZG4fW2t2W";
  const token = Cookies.get("token");
  const id = Cookies.get("id");
  const navigate = useNavigate();
  const newPost = useCallback(() => {
    dispatch(getActiveState(0));
    navigate("/newblog");
  }, [navigate]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  useEffect(() => {
    if (searchValue?.length === 0) {
      setVisibleList(6);
      const filteredResults = [...backendData];
      filteredSearchResults(filteredResults);
    } else {
      const filteredResults = [...backendData]?.filter(
        (item) =>
          item?.subtitle?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
          item?.firstName?.toLowerCase()?.includes(searchValue.toLowerCase())
      );
      setVisibleList(filteredResults?.length);
      filteredSearchResults(filteredResults);
    }
  }, [backendData, searchValue]);

  const LoadMore = useCallback(() => {
    setVisibleList((prevValue) => prevValue + 6);
  }, []);

  const fetchTransaction = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/blog`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    console.log("DATA", data);
    setBackendData(data);
    if (searchValue?.length === 0) {
      const filteredResults = [...data];
      filteredSearchResults(filteredResults);
    } else {
      const filteredResults = [...data]?.filter((item) =>
        item?.subtitle?.toLowerCase()?.includes(searchValue.toLowerCase())
      );
      filteredSearchResults(filteredResults);
    }
  };
  const remove = async (_id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/blog/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setOpen(false);
      fetchTransaction();
    }
  };
  const redirectToBlog = useCallback((i) => {
    dispatch(getBlog(i));
    console.log(i);
    navigate("/showBlog");
  }, []);

  const likePost = async (id) => {
    console.log("ID", id);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/blog/like`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    if (res.ok) {
      fetchTransaction();
    }
  };

  const unlikePost = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/blog/unlike`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    if (res.ok) {
      fetchTransaction();
    }
  };
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const updatehandleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/blog/${form?._id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(form),
      }
    );
    fetchTransaction();
    setOpenUpdate(false);
  };
  return (
    <>
      <div>
        <TextField
          label="Search Blog by Category"
          variant="standard"
          className="searchInputField"
          style={{
            marginLeft: "4%",
            width: "44%",
            display: "inline-block",
            color: "red",
          }}
          onChange={(event) => {
            findSearchTerm(event.target.value);
          }}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ textAlign: "right" }}
          style={{ width: "48%", display: "inline-block" }}
        >
          <Button
            className="buttonNewPost"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={newPost}
          >
            New Post
          </Button>
        </Stack>
      </div>
      <div className="blog-container">
        {filteredSearch?.slice(0, visibleList)?.map((i, key) => {
          return (
            <div className="card" key={key}>
              <div className="card__header">
                <div className="tagCard">
                  <div className="avatar">
                    <img src={Avatar} className="avatarImage" />
                  </div>
                  <div className="avatarHeadline">
                    {i?.firstName
                      ? i.firstName + " " + i?.lastName
                      : "Anonymous"}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      width: "26%",
                      float: "right",
                    }}
                  >
                    <span>
                      {JSON.parse(
                        CryptoJS.AES.decrypt(i.user_id, secretPass).toString(
                          CryptoJS.enc.Utf8
                        )
                      ) === Cookies.get("id") ? (
                        <IconButton
                          aria-label="delete"
                          style={{ color: "white" }}
                          onClick={() => handleClickOpenUpdate(i)}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </span>
                    <span>
                      {JSON.parse(
                        CryptoJS.AES.decrypt(i.user_id, secretPass).toString(
                          CryptoJS.enc.Utf8
                        )
                      ) === Cookies.get("id") ? (
                        <IconButton
                          aria-label="delete"
                          style={{ color: "white" }}
                          onClick={() => handleClickOpen(i._id)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
                <img
                  src={`https://source.unsplash.com/600x400/?${i.subtitle}`}
                  alt="card__image"
                  className="card__image"
                  width="600"
                />
                <div className="CardAction">
                  <div style={{ display: "inline-block", width: "55%" }}>
                    <span style={{ textAlign: "right" }}>
                      {i.likes.includes(id) ? (
                        <IconButton
                          aria-label="delete"
                          style={{ color: "#191919" }}
                          onClick={() => unlikePost(i._id)}
                        >
                          <FavoriteIcon style={{ color: "#2da1cb" }} />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label="delete"
                          style={{ color: "#191919" }}
                          onClick={() => likePost(i._id)}
                        >
                          <FavoriteBorderIcon />
                        </IconButton>
                      )}
                    </span>
                    <span style={{ textAlign: "right" }}>
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#191919" }}
                        onClick={() => remove(i._id)}
                      >
                        <NotesRoundedIcon />
                      </IconButton>
                    </span>
                    <span style={{ textAlign: "right" }}>
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#191919" }}
                        onClick={() => redirectToBlog(i)}
                      >
                        <SendRoundedIcon />
                      </IconButton>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      width: "45%",
                      textAlign: "right",
                    }}
                  >
                    <span
                      className="tag tag-purple"
                      style={{ display: "inline-block" }}
                    >
                      {i.subtitle}
                    </span>
                    <span
                      className="tag tag-blue"
                      style={{ display: "inline-block" }}
                    >
                      {i.datePost}
                    </span>
                  </div>
                </div>

                <span style={{ marginLeft: "5.5%" }}>
                  {i?.likes?.length >= 1
                    ? i?.likes?.length + " hearts"
                    : i?.likes?.length + " heart"}
                </span>
                <div className="card__body">
                  <h4>{i.title}</h4>
                  <p>{i.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {visibleList >= 6 && visibleList <= filteredSearch?.length ? (
        <span style={{ textAlign: "right" }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ textAlign: "right" }}
            style={{ width: "48%", display: "inline-block" }}
          >
            <Button
              className="buttonLoadMore"
              variant="outlined"
              startIcon={<AddIcon />}
              aria-label="delete"
              style={{ color: "#191919" }}
              onClick={LoadMore}
            >
              Load More
            </Button>
          </Stack>
        </span>
      ) : (
        ""
      )}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {" "}
          <img src={Logo} style={{ width: "15%" }} />
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "Josefin Sans" }}
          >
            {"Are you sure you want to delete this blog?"}
          </DialogTitle>
          <DialogActions sx={{ textAlign: "center", justifyContent: "center" }}>
            <Button
              onClick={handleClose}
              sx={{ fontFamily: "Josefin Sans", color: "#2da1cb" }}
            >
              Close
            </Button>
            <Button
              onClick={() => remove(selectedBlogtobeDeleted)}
              autoFocus
              sx={{
                fontFamily: "Josefin Sans",
                color: "#2da1cb",
                fontWeight: 800,
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {" "}
          <img src={Logo} style={{ width: "15%" }} />
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "Josefin Sans" }}
          >
            {"Are you sure you want to update this blog?"}
          </DialogTitle>
          <form onSubmit={updatehandleSubmit}>
          <div className="form__group__update field">
            <label className="form__label">Blog Title</label>
              <input type="text" className="form__field" placeholder="Blog Title"
              id="title"
              name="title"
              value={form?.title}
              onChange={handleInput} />
            </div>
            <div className="form__group__update field">
            <label className="form__label">Blog Description</label>
              <textarea type="text" className="form__field"
             cols=""
             id="description"
             name="description"
             rows="0"
             value={form?.description}
             onChange={handleInput} />
            </div>
            <DialogActions
              sx={{ textAlign: "center", justifyContent: "center" }}
            >
              <Button
                onClick={handleCloseUpdate}
                sx={{ fontFamily: "Josefin Sans", color: "#2da1cb" }}
              >
                Close
              </Button>
              <Button
                onClick={updatehandleSubmit}
                autoFocus
                sx={{
                  fontFamily: "Josefin Sans",
                  color: "#2da1cb",
                  fontWeight: 800,
                }}
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
};
export default BlogCard;
