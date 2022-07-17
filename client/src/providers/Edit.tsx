import { Accessor, createContext, createSignal, ParentComponent, useContext } from 'solid-js';
import { useAuthContext } from './Auth';

type EditStore = [
  {
    inEditMode: Accessor<boolean>;
  },
  {
    setEditMode: (enabled: boolean) => void;
  }
];

const EditContext = createContext<EditStore>([
  {
    inEditMode: () => false,
  },
  {
    setEditMode: (enabled) => {},
  },
]);

export const EditProvider: ParentComponent = (props) => {
  const [inEditMode, setIneditMode] = createSignal(false);
  const [auth] = useAuthContext();

  const setEditMode = (enabled: boolean) => {
    if (auth.loggedIn && auth.user.MODIFY_ALL) {
      // Only allow enabling edit mode if user had EDIT rights and logged in.
      setIneditMode(enabled);
    } else {
      setIneditMode(false);
    }
  };

  const EditStore: EditStore = [
    {
      inEditMode: inEditMode,
    },
    {
      setEditMode: setEditMode,
    },
  ];

  return <EditContext.Provider value={EditStore}>{props.children}</EditContext.Provider>;
};

export function useEditContext() {
  return useContext(EditContext);
}
