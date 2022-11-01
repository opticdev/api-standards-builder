import React from "react";
import validator from "@rjsf/validator-ajv8";

import Form from "@rjsf/semantic-ui";

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
  onValidChange: () => {};
  defaultValue: object;
}) {
  return (
    <div
      style={{ border: "1px solid #e2e2e2", marginTop: 10 }}
      className="p-3 bg-white shadow-lg"
    >
      <Form
        uiSchema={uiSchema}
        schema={props.schema}
        validator={validator}
        onChange={log("changed")}
        onError={log("errors")}
      />
    </div>
  );
}
