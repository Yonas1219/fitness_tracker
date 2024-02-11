import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createContact,
  editContact,
} from "../../features/contact/contactSlice";
import { useEffect } from "react";
const Addcontact = () => {
  const {
    isLoading,
    relation,
    relationOption,
    exercise,
    duration,
    email,
    target,
    createdAt,
    result,
    isEditing,
    editContactId,
  } = useSelector((store) => store.contact);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!exercise || !duration || !target) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editContact({
          contactId: editContactId,
          contact: {
            exercise,
            email,
            duration,
            relation,
            target,
            result,
            createdAt,
          },
        })
      );
      return;
    }
    dispatch(
      createContact({
        exercise,
        email,
        duration,
        relation,
        target,
        result,
        createdAt,
      })
    );
  };

  const handlecontactInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  // useEffect(() => {
  //   if (!isEditing) {
  //     dispatch(
  //       handleChange({
  //         name: "contactLocation",
  //         value: user.steps,
  //       })
  //     );
  //   }
  // }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit contact" : "add job"}</h3>
        <div className="form-center">
          {/* email */}
          <FormRow
            type="text"
            name="email"
            value={email}
            handleChange={handlecontactInput}
          />
          {/* name */}
          <FormRow
            type="text"
            name="exercise"
            value={exercise}
            handleChange={handlecontactInput}
          />
          {/* duration */}
          <FormRow
            type="number"
            name="duration"
            labelText="duration"
            value={duration}
            handleChange={handlecontactInput}
          />
          {/* target */}
          <FormRow
            type="text"
            name="target"
            labelText="target"
            value={target}
            handleChange={handlecontactInput}
          />
          {/* result */}
          <FormRow
            type="text"
            name="result"
            labelText="result"
            value={result}
            handleChange={handlecontactInput}
          />
          {/* relation */}
          <FormRowSelect
            name="relation"
            value={relation}
            handleChange={handlecontactInput}
            list={relationOption}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default Addcontact;
