import { createContext, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useAuthContext } from './Auth';

type EditStore = [
  {
    enabled: boolean;
  },
  {
    setEditMode: (enabled: boolean) => void;
  }
];

const EditContext = createContext<EditStore>([
  {
    enabled: false,
  },
  {
    setEditMode: (enabled) => {},
  },
]);

export const EditProvider: ParentComponent = (props) => {
  const [auth] = useAuthContext();
  const [inEditMode, setIneditMode] = createStore({ enabled: auth.user.MODIFY_ALL });

  const setEditMode = (enabled: boolean) => {
    if (auth.loggedIn && auth.user.MODIFY_ALL) {
      // Only allow enabling edit mode if user had EDIT rights and logged in.
      setIneditMode({ enabled: enabled });
    } else {
      setIneditMode({ enabled: false });
    }
  };

  const EditStore: EditStore = [
    inEditMode,
    {
      setEditMode: setEditMode,
    },
  ];

  return <EditContext.Provider value={EditStore}>{props.children}</EditContext.Provider>;
};

export function useEditContext() {
  return useContext(EditContext);
}
