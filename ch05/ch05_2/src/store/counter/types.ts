import type {Action} from 'redux'

export type State = number

// {type:'@counter/setCounter', payload: State}
export type SetCounterAction = Action<'@counter/setCounter'> & {payload: State}

export type Actions = SetCounterAction
