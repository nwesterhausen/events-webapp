export type PermissionsObj = {
  IS_ADMIN: boolean;
  MODIFY_ALL: boolean;
  VIEW_ALL: boolean;
};

export const PERMISSION_ID = {
  VIEW_ALL: 1,
  MODIFY_ALL: 2,
  IS_ADMIN: 3,
};

export const LinkTypes = ['Navigation', 'Youtube', 'Spotify', 'Ultimate Guitar', 'Generic', 'No Icon', 'Music'] as const;

export const PermissionsRef = [
  {
    id: 1,
    name: 'View All',
    description: 'Allowed to view details for everything except the user list.',
  },
  {
    id: 2,
    name: 'Modify All',
    description: 'Allowed edit to everything except a user list and site settings.',
  },
  {
    id: 3,
    name: 'Admin',
    description: 'Full access to all tables and site settings.',
  },
];

// Types to get a set of allowed numeric indices
type MAXIMUM_ALLOWED_BOUNDARY = 999;

type ComputeRange<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N
  ? Result
  : ComputeRange<N, [...Result, Result['length']]>;

type NumberRange = ComputeRange<MAXIMUM_ALLOWED_BOUNDARY>[number];

type FilterNumbers<T extends PropertyKey> = T extends `${number}` ? T : never;

type ToNumber<T extends string, Range extends number> = T extends string
  ? Range extends number
    ? T extends `${Range}`
      ? Range
      : never
    : never
  : never;
export type GetNumericKeys<T extends PropertyKey> = ToNumber<FilterNumbers<T>, NumberRange>;
