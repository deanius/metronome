import { createReducer, iMap } from 'antares-protocol'

export const metronomeInitialState = {
    name: 'Node 10.2',
    blocks: [
        {
            name: 'Intro',
            duration: 1 * 60
        },
        {
            name: 'CLI Args',
            duration: 7 * 60
        }
    ]
}
export const metronomeReducer = createReducer({}, metronomeInitialState)

export const viewReducer = createReducer({
    'View.Speech.start': (state) => state.set('speechActive', true),
    'View.Speech.stop': (state) => state.set('speechActive', false),
    'View.Timer.tick': (state) => {
        return state
            .update('present', p => p + 1)
            .set('active', true)
    }
}, new iMap({
    present: 2,
    active: false,
    speechActive: false
}))