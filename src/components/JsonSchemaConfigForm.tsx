import React, { useState } from "react";
import validator from "@rjsf/validator-ajv8";

import Form from "@rjsf/core";

const log = (type) => console.log.bind(console, type);

import { UiSchema } from "@rjsf/utils";

const uiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    props: {
      disabled: false,
      className: "btn btn-info",
    },
    norender: true,
    submitText: "Submit",
  },
};

export function JsonSchemaConfigForm(props: {
  schema: object;
  onValidChange: (changedValue: any) => void;
  defaultValue: object;
}) {
  const [errors, setErrors] = useState("");
  return (
    <div
      style={{ border: "1px solid #e2e2e2", marginTop: 10 }}
      className="p-3 bg-white shadow-lg bg-gray-50"
    >
      {errors && <span className="font-bold text-red-600">{errors}</span>}
      <Form
        key="ID"
        uiSchema={uiSchema}
        schema={props.schema}
        formData={props.defaultValue}
        validator={validator}
        onChange={({ formData, errors }, val) => {
          if (errors.length === 0 && formData) {
            setErrors("");
            props.onValidChange(formData);
          } else {
            setErrors(errors.join("\n"));
          }
        }}
      />
    </div>
  );
}
