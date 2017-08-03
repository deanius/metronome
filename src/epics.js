import { Rx } from 'antares-protocol'
import { Timer } from './actions'

const { Observable } = Rx

export const Epics = {
    tickTillStopped: action$ =>
        action$.ofType('Timer.start')
            .mergeMap(() => {
                return Observable
                    .interval(1000)
                    .mapTo(Timer.tick())
                    .takeUntil(action$.ofType('Timer.stop'))
            })
}