import React, { useEffect } from "react";
import "./Modals.scss";

function TemplateDescriptionEdit(props: {
  description: string | undefined;
  setDescription: (description: string) => void;
  placeholder?: string | undefined;
  ressource: any;
}) {
  const { setDescription, placeholder, description } = props;

  const [initialValue, setInitialValue] = React.useState(
    description || placeholder
  );

  useEffect(() => {
    setInitialValue(description || placeholder);
  }, []);

  return (
    <div className="template_description_edit-ctn">
      <input
        autoFocus
        placeholder={initialValue}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />
    </div>
  );
}

export default TemplateDescriptionEdit;
