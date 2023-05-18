import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  // states
  const [name, setName] = useState(true);
  const [street, setStreet] = useState(true);
  const [zipcode, setZipcode] = useState(true);
  const [city, setCity] = useState(true);

  const isNotEmpty = (value) => value.trim() !== "";
  const isFiveChars = (value) => value.trim().length === 5;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const zipcodeInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    // store user input
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredZipcode = zipcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // checking if input is valid
    const enteredNameValid = isNotEmpty(enteredName);
    const enteredStreetValid = isNotEmpty(enteredStreet);
    const enteredCityValid = isNotEmpty(enteredCity);
    const enteredZipcodeValid = isFiveChars(enteredZipcode);

    setName(enteredNameValid);
    setStreet(enteredStreetValid);
    setCity(enteredCityValid);
    setZipcode(enteredZipcodeValid);

    // checking if form is valid
    const formIsValid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredCity &&
      enteredZipcodeValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      zipcode: enteredZipcode,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    name ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    name ? "" : classes.invalid
  }`;
  const zipcodeControlClasses = `${classes.control} ${
    name ? "" : classes.invalid
  }`;

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Enter Name</label>
          <input id="name" type="text" ref={nameInputRef}></input>
          {!name && <p>Please enter a valid name</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Enter Street</label>
          <input id="street" type="text" ref={streetInputRef}></input>
          {!name && <p>Please enter a valid street</p>}
        </div>
        <div className={zipcodeControlClasses}>
          <label htmlFor="zipcode">Enter Zipcode</label>
          <input id="zipcode" type="text" ref={zipcodeInputRef}></input>
          {!name && <p>Please enter a valid zipcode</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">Enter City</label>
          <input id="city" type="text" ref={cityInputRef}></input>
          {!name && <p>Please enter a valid city</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
