import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const initValue = {
  name: "",
  city: "",
  age: "",
  education: "",
  gender: "",
  contact: "",
};

export const Panel = () => {
  const [formData, setFormData] = useState(initValue);
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function getData() {
    fetch(`http://localhost:3001/students?_page=${page}&_limit=4`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setArr(data);
        setLoading(false);
      });
  }

  const handleAsc = async () => {
    const res = await axios.get(`http://localhost:3001/students`, {
      params: {
        _page: page,
        _limit: 4,
        _sort: "age",
      },
    });
    setArr(res.data);
  };

  const handleDesc = async () => {
    const res = await axios.get(`http://localhost:3001/students`, {
      params: {
        _page: page,
        _limit: 4,
        _sort: "age",
        _order: "desc",
      },
    });
    setArr(res.data);
  };

  const handleName = async () => {
    const res = await axios.get(`http://localhost:3001/students`, {
      params: {
        _page: page,
        _limit: 4,
        _sort: "name",
      },
    });
    setArr(res.data);
  };

  useEffect(() => {
    getData();
  }, [page]);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="form">
        <h1>Student Details</h1>
        <label>Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="enter your name"
        />

        <label>City</label>
        <input
          onChange={handleChange}
          type="text"
          name="city"
          placeholder="enter your city"
        />

        <label>Age</label>
        <input
          onChange={handleChange}
          type="number"
          name="age"
          placeholder="enter your age"
        />

        <label>Education</label>
        <input
          onChange={handleChange}
          type="text"
          name="education"
          placeholder="enter your Education"
        />

        <label>Gender</label>
        <input
          onChange={handleChange}
          type="text"
          name="gender"
          placeholder="enter your Gender"
        />

        <label>Contact</label>
        <input
          onChange={handleChange}
          type="text"
          name="contact"
          placeholder="enter your Contact"
        />

        <button
          onClick={() => {
            const data = {
              name: formData.name,
              city: formData.city,
              age: formData.age,
              gender: formData.gender,
              education: formData.education,
              contact: formData.contact,
            };
            fetch("http://localhost:3001/students", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(() => {
              getData();
            });
          }}
        >
          Submit
        </button>

        <div className="filter">
          <div>
            <button onClick={handleAsc}>Ascending Age</button>
          </div>
          <div>
            <button onClick={handleDesc}>Descending Age</button>
          </div>
          <div>
            <button onClick={handleName}>Sort By Name</button>
          </div>
        </div>
      </div>

      <div className="list">
        <div>
          <h2>name</h2>
        </div>
        <div>
          <h2>city</h2>
        </div>
        <div>
          <h2>age</h2>
        </div>
        <div>
          <h2>gender</h2>
        </div>
        <div>
          <h2>education</h2>
        </div>
        <div>
          <h2>contact</h2>
        </div>
      </div>

      {arr.map((e, id) => (
        <div className="list" key={id}>
          <div>{e.name}</div>
          <div>{e.city}</div>
          <div>{e.age}</div>
          <div>{e.gender}</div>
          <div>{e.education}</div>
          <div>{e.contact}</div>
          <div>
            <button
              onClick={() => {
                fetch(`http://localhost:3001/students/${e.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then(() => {
                  getData();
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="page">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};
