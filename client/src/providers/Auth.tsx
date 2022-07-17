import { createContext, createEffect, createResource, lazy, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { UserData } from '../../../common/types/api';

const LoginPage = lazy(() => import('../pages/LoginPage'));

type AuthStore = [
  {
    user: UserData;
    loggedIn: boolean;
  },
  {
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
  }
];

const AuthContext = createContext<AuthStore>([
  {
    user: {
      id: -1,
      name: '',
      email: '',
      discordId: '',
      googleId: '',
      IS_ADMIN: false,
      MODIFY_ALL: false,
      VIEW_ALL: false,
      created_at: '',
      updated_at: '',
    },
    loggedIn: false,
  },
  {
    logout: async () => {},
    refreshAuth: async () => {},
  },
]);

export const AuthenticationProvider: ParentComponent = (props) => {
  let loadedOnce = false;
  const [auth, setAuth] = createStore<{ user: UserData; loggedIn: boolean }>({
    user: {
      id: -1,
      name: '',
      email: '',
      discordId: '',
      googleId: '',
      IS_ADMIN: false,
      MODIFY_ALL: false,
      VIEW_ALL: false,
      created_at: '',
      updated_at: '',
    },
    loggedIn: false,
  });

  const clearStore = () => {
    setAuth('user', { id: -1, name: '', email: '', IS_ADMIN: false, MODIFY_ALL: false, VIEW_ALL: false, created_at: '', updated_at: '' });
    setAuth('loggedIn', false);
  };

  const doLogout = async () => {
    clearStore();
    await fetch('/auth/logout');
  };
  /**
   * The following is a resource (which just means data we are fetching from somewhere, probably asyncronously)
   * that hits the '/auth/account/' endpoint to get user details. If there is an existing session for the connection,
   * this will return the user data. If there isn't, this doesn't return anything useful.
   */
  const [sessionLogin, { refetch }] = createResource(
    async () => {
      const resp = await fetch('/auth/me', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resp.ok) {
        return { complete: true, user: null };
      }
      const data = await resp.json();
      return {
        complete: true,
        user: data.user_details,
      };
    },
    {
      initialValue: { complete: false, user: null },
    }
  );

  createEffect(() => {
    if (sessionLogin.latest.complete && sessionLogin.latest.user !== null) {
      console.log(JSON.stringify(sessionLogin.latest, null, 2));
      setAuth('user', sessionLogin.latest.user);
      setAuth('loggedIn', true);
      loadedOnce = true;
    }
  });

  const authStatus: AuthStore = [
    auth,
    {
      async logout() {
        await doLogout();
      },
      async refreshAuth() {
        await refetch();
      },
    },
  ];
  return (
    <AuthContext.Provider value={authStatus}>
      {sessionLogin.loading && !loadedOnce ? <></> : <>{auth.loggedIn ? props.children : <LoginPage />}</>}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
