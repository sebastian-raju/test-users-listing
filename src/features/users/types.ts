/**
 * A user as returned by the JSONPlaceholder `/users` endpoint.
 * Only the fields this app uses are declared; the API returns more.
 */
export interface User {
  id: number
  name: string
  email: string
  address: {
    city: string
  }
  company: {
    name: string
  }
}
