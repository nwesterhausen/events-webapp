import { createContext, createSignal, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import EditSlidover from '../components/EditSlidover';
import { useAuthContext } from './Auth';

type EditStore = [
  {
    enabled: boolean;
  },
  {
    setEditMode: (enabled: boolean) => void;
    openEditItinerary: (forId: number) => void;
    openEditSetlist: (forId: number) => void;
    openCreateItinerary: () => void;
    openCreateSetlist: () => void;
  }
];

const EditContext = createContext<EditStore>([
  {
    enabled: false,
  },
  {
    setEditMode: (enabled) => {},
    openEditItinerary: (forId: number) => {},
    openEditSetlist: (forId: number) => {},
    openCreateItinerary: () => {},
    openCreateSetlist: () => {},
  },
]);

export const EditProvider: ParentComponent = (props) => {
  const [auth] = useAuthContext();
  const [inEditMode, setIneditMode] = createStore({ enabled: true });

  const [shown, setShown] = createSignal(false);
  const handleOpen = () => setShown(true);
  const handleClose = () => setShown(false);

  const setEditMode = (enabled: boolean) => {
    if (auth.loggedIn && auth.user.MODIFY_ALL) {
      // Only allow enabling edit mode if user had EDIT rights and logged in.
      setIneditMode({ enabled: enabled });
    } else {
      setIneditMode({ enabled: false });
    }
  };

  const openEditItinerary = (forId: number) => {
    handleOpen();
  };

  const openEditSetlist = (forId: number) => {
    handleOpen();
  };

  const openCreateItinerary = () => {
    handleOpen();
  };

  const openCreateSetlist = () => {
    handleOpen();
  };

  const EditStore: EditStore = [
    inEditMode,
    {
      setEditMode: setEditMode,
      openEditItinerary: openEditItinerary,
      openEditSetlist: openEditSetlist,
      openCreateItinerary: openCreateItinerary,
      openCreateSetlist: openCreateSetlist,
    },
  ];

  return (
    <EditContext.Provider value={EditStore}>
      {props.children}
      <EditSlidover shown={shown()} handleClose={handleClose} />
    </EditContext.Provider>
  );
};

export function useEditContext() {
  return useContext(EditContext);
}
