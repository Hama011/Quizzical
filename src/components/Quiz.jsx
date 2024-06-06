import { useEffect, useState } from "react";
import getData from "../services/getData";
import blob2 from "../assets/images/blob2.png";
import ylob2 from "../assets/images/ylob2.png";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";
import { TiArrowBack } from "react-icons/ti";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      requestData();
    } else {
      navigate("/");
    }
  }, []);

  const [data, setData] = useState(null);
  const { quizOptions } = location.state || {};
  const [selectedOptions, setSelectedOptions] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [checkMode, setCheckMode] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const requestData = () => {
    setCheckMode(false);
    setSelectedOptions({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    });
    getData(quizOptions)
      .then((data) => setData(data))
      .catch((e) => navigate("/"));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleOptionsClick = (event, idx) => {
    if (!checkMode) {
      setSelectedOptions((preveData) => ({
        ...preveData,
        [idx]: event.target.innerText,
      }));
    }
  };

  let questions = [];
  if (data) {
    questions = data.map((data, index) => (
      <Question
        key={index}
        idx={index}
        data={data}
        handleOptionClick={handleOptionsClick}
        selectedOption={selectedOptions[index]}
        checkMode={checkMode}
      />
    ));
  }

  const handleCheckAnswers = () => {
    setCorrectAnswers(
      data
        .map((option, index) => {
          return option.correct_answer === selectedOptions[index];
        })
        .filter(Boolean).length
    );
    setCheckMode(true);
  };

  const allOptionsSelected = Object.values(selectedOptions).every(
    (option) => option !== ""
  );

  let message;
  if (checkMode) {
    if (correctAnswers === 5) {
      message = "Perfect score! You're a quiz master! ";
    } else if (correctAnswers == 4) {
      message = "Great job! You have a solid understanding. ";
    } else if (correctAnswers == 3) {
      message = "Good effort! Keep practicing to improve. ";
    } else {
      message = "Don't worry, keep trying and you'll get better! ";
    }
  }

  return questions.length > 0 ? (
    <div className="quiz-container">
      <img src={ylob2} className="top-img" />
      <TiArrowBack className="goback-icon" onClick={handleGoBack} />
      {questions}
      <div className="button-container">
        {checkMode && (
          <p className="result">
            {message} {correctAnswers}/5
          </p>
        )}
        <button
          className="btn check"
          onClick={checkMode ? requestData : handleCheckAnswers}
          disabled={!checkMode && !allOptionsSelected}
        >
          {checkMode ? "Try Again" : "Check Answers"}
        </button>
      </div>
      <img src={blob2} className="bottom-img" />
    </div>
  ) : (
    <h4 style={{ color: "#353f7a" }}>Loading...</h4>
  );
}
