import "./BlogForm.css";
import React,{ useCallback, useState, useEffect } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import { useDispatch, useSelector } from 'react-redux';
import { CARD_BLOG_OPTION } from "../../config.js";
import { useNavigate } from "react-router-dom";
import {getActiveState} from '../../store/authStore.js'
const initialForm = {
  title: "",
  subtitle: "",
  description: "",
  datePost: moment().format("DD MMM"),
};

const BlogForm = () => {
  const activeState = useSelector((state) => state.auth.activeStep);
  const [form, setForm] = useState(initialForm);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setForm(initialForm);
  }, [])
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChange = useCallback((event) => {
    setForm({ ...form, subtitle: event.target.value });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/blog`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.json();
    if (data.ok) {
      setForm(initialForm);
    }
    await dispatch(getActiveState(0));
    await navigate('/blog')
  };

  return (
    <div className="blogform">
      <ProgressStepper/>
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit}>
            {activeState === 1 && 
            <>
            <div className="form__group field">
            <label className="form__label">Blog Title</label>
              <input type="text" className="form__field" placeholder="Blog Title"
              id="title"
              name="title"
              value={form.title}
              onChange={handleInput} />
            </div>
            <div className="form__group field">
            <label className="form__label">Blog Description</label>
              <textarea type="text" className="form__field"
             cols="50"
             id="description"
             name="description"
             rows="4"
             value={form.description}
             onChange={handleInput} />
            </div>
            
            </>}
            {activeState === 0 && 
            <div className="cardForm" >
            {CARD_BLOG_OPTION?.map((i, key) => {
            return (
              
                <div className="cardBlogForm" key={key}>
                  <a className="card">
                    <img src={i.image} className="card__image" alt={i.headline}/>
                    <div className="card__overlay">
                      <div className="card__header">
                        <div className="card__header-text">
                          <h3 className="card__title">{i.headline}</h3>  
                          <input type="radio" onClick={handleChange} value={i.headline}/>
                        </div>
                      </div>
                      </div>
                  
                  </a>      
                </div> 
            )})}
             
            </div>
            }
            <br/>
             {activeState === 3 &&
              (form.title === "" ? "Please Select Previous Options" : <button className="signupbutton">Publish</button>) 
             }
          </form>
        </div>
       
      </div>
    </div>
  );
};
export default BlogForm;
