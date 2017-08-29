import { AntaresInit } from 'antares-protocol'
import { Epics } from '../epics'
import { metronomeReducer, viewReducer } from '../reducer'

export const defaultKey = ['presentation', 0]

// target every action to a key called
const assignKey = () => ({ key: defaultKey })

// Let's Initialize Antares!
//
// ReducerForKey: provides our reducer to Antares whenever it is asked
// MetaEnhancers: functions which, in our case, add routing information
//                to the outgoing actions - namely the key of the record
//                we are acting upon.

// An action object is a JavaScript literal with fields:
//    type: string - indicates what action to be taken
//    payload: object - the parameters of this action, as an Object
//    meta: object - the routing info (key), and any other metadata
//        Not intended to become part of the store
//
// We reduce an action into the store (aka dispatch) by calling 'process'

// Let's Initialize Antares, already !
export const Antares = AntaresInit({
  ReducerForKey: () => metronomeReducer,
  MetaEnhancers: [assignKey],
  ViewReducer: viewReducer,
  Epics
})

Object.assign(window, {
  Antares,
  metronomeReducer
})
