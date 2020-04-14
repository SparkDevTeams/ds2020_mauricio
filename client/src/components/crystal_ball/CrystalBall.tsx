import React, { useState } from "react";
import axios from "axios";
import cball from "../../crystall_ball.png";
import "./CrystalBall.css";

const CrystalBall: React.FC = () => {
  let url: string = "";

  url = window.location.protocol + "//" + window.location.host + "/fortune";
  // url = "http://104.196.179.144:8080/fortune";

  const [msg, setMsg] = useState("");

  let get_message = () => {
    console.log("Clicked!");
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log('Response:')
        console.log(res);
        setMsg(res.data);
      })
      .catch((err) => {
        console.log("Error:")
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
        <a href="/" onClick={get_message} className="btn btn-primary">
          Get My Fortune Told
        </a>
      </div>
    </div>
  );
};

export default CrystalBall;
