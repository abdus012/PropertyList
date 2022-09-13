import React, { useEffect, useState } from "react";
import axios from "axios";
const initialValues = {
  name: "",
  description: "",
  size: ""
};

const baseURL = "https://seq-backend-postgres.herokuapp.com/";

export default function Form() {
  let [values, setValues] = useState(initialValues);
  const [inputList, setInputList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const deleteItems = (i) => {
    setInputList((olditem) => {
      axios
        .post(`${baseURL}deleteProperty`, {
          name: olditem[i].name,
          description: olditem[i].description,
          size: olditem[i].size
        })
        .then((response) => {});
    });
  };
  const listOfItems = () => {
    axios
      .post(`${baseURL}pushProperty`, {
        name: values.name,
        description: values.description,
        size: values.size
      })
      .then((response) => {});
    setValues({ ...initialValues });
  };
  useEffect(() => {
    axios.get(`${baseURL}propertylist`).then((response) => {
      setInputList(response.data);
    });
  });
  return (
    <div className="main_div">
      <div className="center_div">
        <br />
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="name"
        />
        <span className="input_space"></span>
        <input
          type="text"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="description"
        />
        <span className="input_space"></span>
        <input
          type="text"
          name="size"
          value={values.size}
          onChange={handleInputChange}
          placeholder="size"
        />
        <button onClick={listOfItems}>+</button>
        <ol>
          {inputList?.map((item, i) => {
            return (
              <div className="listPos">
                <li>
                  {item.name} {item.description} {item.size}
                  <button
                    className="rightMostBtn"
                    onClick={() => {
                      deleteItems(i);
                    }}
                  >
                    -
                  </button>
                </li>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
