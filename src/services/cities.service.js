import { RestService } from '@services'

const search = ({ search }) => {
  return RestService.get('/cities?_expand=state', {
    params: {
      q: search
    }
  })
}

const index = () => {
  return RestService.get('/cities?_expand=state')
}

const show = ({ id }) => {
  return RestService.get(`/cities/${id}?_expand=state`)
}

export const CitiesService = {
  search,
  index,
  show
}
