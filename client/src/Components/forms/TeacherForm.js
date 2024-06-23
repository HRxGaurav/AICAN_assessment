import React from "react";
import FormComponent from "../common/FormComponent";

const TeacherForm = () => {
  const genderOptions = [
    { label: "", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const classOptions = [
    { label: "Select", value: "" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];

  const fields = [
    { name: "name", label: "Name", required: true },
    {
      name: "gender",
      label: "Gender",
      type: "dropdown",
      options: genderOptions,
      required: true,
    },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "contact", label: "Contact", type: "tel", required: true },
    { name: "salary", label: "Salary", type: "number", required: true },
    {
      name: "assignedClass",
      label: "Assigned Class",
      type: "dropdown",
      options: classOptions,
    },
  ];

  return (
    <FormComponent
      fields={fields}
      apiUrl="add_teachers"
      titleHeading="Add Teacher"
      submitType="POST"
    />
  );
};

export default TeacherForm;
