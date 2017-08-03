import { Rx } from 'antares-protocol'
import { Timer } from './actions'

const { Observable } = Rx

export const Epics = {
    tickTillStopped: action$ =>
        action$.ofType('Timer.start')
        .mapTo(Timer.tick())
}