import { createContext, createEffect, createResource, lazy, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { PermissionsObj } from '../../../common/types/shared';

const LoginPage = lazy(() => import('../pages/LoginPage'));

export type UserObject = {
  id: number;
  name: string;
  email: string;
  discordId?: string;
  googleId?: string;
};

type AuthStore = [
  {
    user: UserObject;
    permissions: PermissionsObj;
    loggedIn: boolean;
  },
  {
    logout: () => Promise<void>;
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
    },
    permissions: {
      IS_ADMIN: false,
      MODIFY_ALL: false,
      VIEW_ALL: false,
    },
    loggedIn: false,
  },
  {
    logout: async () => {},
  },
]);

export const AuthenticationProvider: ParentComponent = (props) => {
  const [auth, setAuth] = createStore<{ user: UserObject; permissions: PermissionsObj; loggedIn: boolean }>({
    user: {
      id: -1,
      name: '',
      email: '',
      discordId: '',
      googleId: '',
    },
    permissions: {
      IS_ADMIN: false,
      MODIFY_ALL: false,
      VIEW_ALL: false,
    },
    loggedIn: false,
  });

  const clearStore = () => {
    setAuth('user', { id: -1, name: '', email: '' });
    setAuth('permissions', {
      IS_ADMIN: false,
      MODIFY_ALL: false,
      VIEW_ALL: false,
    });
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
  const [sessionLogin] = createResource(
    async () => {
      const resp = await fetch('/auth/me', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resp.ok) {
        return { complete: true, user: null };
      }
      return {
        complete: true,
        ...(await resp.json()),
      };
    },
    {
      initialValue: { complete: false, user: null },
    }
  );

  createEffect(() => {
    if (sessionLogin.latest.complete && sessionLogin.latest.user !== null) {
      console.log(sessionLogin.latest);
      setAuth('user', {
        id: sessionLogin.latest.user_details.id,
        name: sessionLogin.latest.user_details.name,
        email: sessionLogin.latest.user_details.email,
        discordId: sessionLogin.latest.user_details.discordId,
        googleId: sessionLogin.latest.user_details.googleId,
      });
      setAuth('permissions', sessionLogin.latest.user_permissions);
      setAuth('loggedIn', true);
    }
  });

  const authStatus: AuthStore = [
    auth,
    {
      async logout() {
        await doLogout();
      },
    },
  ];
  return (
    <AuthContext.Provider value={authStatus}>
      {sessionLogin.loading ? <></> : <>{auth.loggedIn ? props.children : <LoginPage />}</>}
    </AuthContext.Provider>
  );
};
// },
// {
//   auth: {
//     user: {
//       id: -1,
//       name: '',
//       email: '',
//       discordId: '',
//       googleId: '',
//     },
//     permissions: {
//       IS_ADMIN: false,
//       MODIFY_ALL: false,
//       VIEW_ALL: false,
//     },
//     loggedIn: false,
//   },
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   logout: async () => {},
// }

export function useAuthContext() {
  return useContext(AuthContext);
}
