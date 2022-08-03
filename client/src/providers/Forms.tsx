import { createContext, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

interface FormDataStorage {
  [key: string]: any;
}

export const BuildFormProvider = (
  defaultValue: FormDataStorage
): [
  ParentComponent,  () => 
  [
    typeof defaultValue,
    {
      updateFormData: (event: Event) => void;
      updateFormDataRadio: (event: Event) => void;
      updateFormDataCheckbox: (event: Event) => void;
    }
  ]
] => {
  type BuiltFormType = [
    typeof defaultValue,
    {
      updateFormData: (event: Event) => void;
      updateFormDataRadio: (event: Event) => void;
      updateFormDataCheckbox: (event: Event) => void;
    }
  ];

  const FormContext = createContext<BuiltFormType>([
    {
      ...defaultValue,
    },
    {
      updateFormData: (event: Event) => {},
      updateFormDataRadio: (event: Event) => {},
      updateFormDataCheckbox: (event: Event) => {},
    },
  ]);

  const FormsProvider: ParentComponent = (props) => {
    const [formData, setFormData] = createStore(defaultValue);

    // Simple form data updater, use this for text-input and other "simple" (i.e. one element) inputs.
    const updateFormData = (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      setFormData({
        [inputElement.id]: inputElement.value,
      });
    };
    // Radio button form data updater
    const updateFormDataRadio = (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      if (inputElement.checked) {
        const key = (inputElement.getAttribute('name') || inputElement.id).toString();
        setFormData({
          [key]: inputElement.id,
        });
      }
    };
    // Checkbox form data updater
    const updateFormDataCheckbox = (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      setFormData({
        [inputElement.id]: inputElement.checked,
      });
    };

    const FormsStore: BuiltFormType = [
      formData,
      {
        updateFormData: updateFormData,
        updateFormDataRadio: updateFormDataRadio,
        updateFormDataCheckbox: updateFormDataCheckbox,
      },
    ];

    return <FormContext.Provider value={FormsStore}>{props.children}</FormContext.Provider>;
  };

  const useFormsContext = () => useContext(FormContext);

  return [FormsProvider, useFormsContext];
};
