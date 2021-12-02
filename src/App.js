import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const initialValues = {
    username: "",
    age: "",
    email: "",
    phonenumber: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    // const { name, value } = e.target;
    // setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormValues = { ...formValues };
    newFormValues[fieldName] = fieldValue;
    setFormValues(newFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      username: formValues.username,
      age: formValues.age,
      email: formValues.email,
      phonenumber: formValues.phonenumber,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // alert("Form Submitted successfully");
    setFormValues(initialValues);
  };

  const cancelValues = () => {
    setFormValues(initialValues);

  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "*This field is required";
    }
    if (!values.age) {
      errors.age = "*This field is required";
    }
    if (!values.email) {
      errors.email = "*This field is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "*This field is required";
    } else if (values.phonenumber < 10) {
      errors.phonenumber = "Phone Number must be exactly of length 10";
    }
    return errors;
  };

  return (
    <div className="container">
      <form id="formid" onSubmit={handleSubmit}>
        <h1>User form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              min="2"
              max="20"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              min="18"
              max="99"
              value={formValues.age}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.age}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phonenumber"
              placeholder="Phone Number"
              pattern="[789][0-9]{9}"
              value={formValues.phonenumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phonenumber}</p>
          <button onClick={cancelValues} className="fluid red ui button">
            Reset
          </button>
          <button className="fluid ui button green">Submit</button>
        </div>
      </form>
      <table>
        <thread>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone No.</th>
          </tr>
        </thread>
        <tbody>
          {contacts.map((contact) => (
            <tr>
              <td>{contact.username}</td>
              <td>{contact.age}</td>
              <td>{contact.email}</td>
              <td>{contact.phonenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
