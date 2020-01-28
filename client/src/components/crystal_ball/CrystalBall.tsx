import React, { useState } from "react";
import axios from "axios";
import cball from "../../crystall_ball.png";
import "./CrystalBall.css";

const CrystalBall: React.FC = () => {
  let url: string = "";

  if (process.env.NODE_ENV === "production") {
    url = "http://" + process.env.REACT_APP_PROD_SERVER + "/fortune";
  } else if (process.env.NODE_ENV === "development") {
    url = "http://" + process.env.REACT_APP_DEV_SERVER + "/fortune";
  } else if (process.env.NODE_ENV === "test") {
    url = "http://" + process.env.REACT_APP_TEST_SERVER + "/fortune";
  }

  const [msg, setMsg] = useState("");

  let get_message = () => {
    // console.log("Clicked!");
    axios
      .get(url)
      .then(res => {
        // console.log(res);
        setMsg(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="card crystal-ball">
      <img src={cball} className="card-img-top" alt="crystal_ball.png" />
      <div className="card-body">
        <h5 className="card-title">What is your future?</h5>
        <h4 id="msg">{msg}</h4>
        {/* <h4 id="msg">Blah!!</h4> */}
        <a href="#" onClick={get_message} className="btn btn-primary">
          Get My Fortune Told
        </a>
      </div>
    </div>
  );
};

export default CrystalBall;
