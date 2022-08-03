import { createContext, createEffect, createSignal, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import EditSlidover from '../components/EditSlidover';
import { useAuthContext } from './Auth';

type EditStore = [
  {
    enabled: boolean;
    objectType: 'itinerary' | 'section' | 'article' | 'setlist';
    create: boolean;
    parentId: number;
    targetId: number;
  },
  {
    setEditMode: (enabled: boolean) => void;
    openEditItinerary: (forId: number) => void;
    openEditSection: (forId: number) => void;
    openEditArticle: (forId: number) => void;
    openEditSetlist: (forId: number) => void;
    openCreateItinerary: () => void;
    openCreateSetlist: (parentId: number) => void;
    openCreateSection: (parentId: number) => void;
    openCreateArticle: (parentId: number) => void;
  }
];

type EditContextStore = {
  objectType: 'itinerary' | 'section' | 'article' | 'setlist';
  create: boolean;
  parentId: number;
  targetId: number;
};

const EmptyEditContextStore: EditContextStore = {
  objectType: 'setlist',
  create: false,
  parentId: 0,
  targetId: 0,
};

const EditContext = createContext<EditStore>([
  {
    enabled: false,
    ...EmptyEditContextStore,
  },
  {
    setEditMode: (enabled) => {},
    openEditItinerary: (forId: number) => {},
    openEditSection: (forId: number) => {},
    openEditArticle: (forId: number) => {},
    openEditSetlist: (forId: number) => {},
    openCreateItinerary: () => {},
    openCreateSetlist: (parentId: number) => {},
    openCreateSection: (parentId: number) => {},
    openCreateArticle: (parentId: number) => {},
  },
]);

export const EditProvider: ParentComponent = (props) => {
  const [auth] = useAuthContext();
  const [editContextDetails, setContextDetails] = createStore({ enabled: true, ...EmptyEditContextStore });

  createEffect(() => console.debug(editContextDetails));

  const [shown, setShown] = createSignal(true);
  const handleOpen = () => setShown(true);
  const handleClose = () => setShown(false);

  const setEditMode = (enabled: boolean) => {
    if (auth.loggedIn && auth.user.MODIFY_ALL) {
      // Only allow enabling edit mode if user had EDIT rights and logged in.
      setContextDetails('enabled', enabled);
    } else {
      setContextDetails('enabled', false);
    }
  };

  const assignEditDetails = (id?: number) => {
    setContextDetails('create', false);
    setContextDetails('targetId', id || 0);
    setContextDetails('parentId', 0);
  };
  const assignCreateDetails = (parentId?: number) => {
    setContextDetails('create', true);
    setContextDetails('targetId', 0);
    setContextDetails('parentId', parentId || 0);
  };

  const openEditItinerary = (forId: number) => {
    console.debug('called openEditItinerary');
    setContextDetails('objectType', 'itinerary');
    assignEditDetails(forId);
    handleOpen();
  };
  const openCreateItinerary = () => {
    console.debug('called openCreateItinerary');
    setContextDetails('objectType', 'itinerary');
    assignCreateDetails();
    handleOpen();
  };

  const openEditSetlist = (forId: number) => {
    console.debug('called openEditSetlist');
    setContextDetails('objectType', 'setlist');
    assignEditDetails(forId);
    handleOpen();
  };
  const openCreateSetlist = (parentId: number) => {
    console.debug('called openCreateSetlist');
    setContextDetails('objectType', 'setlist');
    assignCreateDetails(parentId);
    handleOpen();
  };

  const openEditSection = (forId: number) => {
    console.debug('called openEditSection');
    setContextDetails('objectType', 'section');
    assignEditDetails(forId);
    handleOpen();
  };
  const openCreateSection = (parentId: number) => {
    console.debug('called openCreateSection');
    setContextDetails('objectType', 'section');
    assignCreateDetails(parentId);
    handleOpen();
  };

  const openEditArticle = (forId: number) => {
    console.debug('called openEditArticle');
    setContextDetails('objectType', 'article');
    assignEditDetails(forId);
    handleOpen();
  };
  const openCreateArticle = (parentId: number) => {
    console.debug('called openCreateArticle');
    setContextDetails('objectType', 'article');
    assignCreateDetails(parentId);
    handleOpen();
  };

  const EditStore: EditStore = [
    editContextDetails,
    {
      setEditMode: setEditMode,
      openEditItinerary: openEditItinerary,
      openEditSection: openEditSection,
      openEditArticle: openEditArticle,
      openEditSetlist: openEditSetlist,
      openCreateItinerary: openCreateItinerary,
      openCreateSetlist: openCreateSetlist,
      openCreateSection: openCreateSection,
      openCreateArticle: openCreateArticle,
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
