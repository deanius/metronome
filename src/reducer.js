import { createReducer, iMap } from 'antares-protocol'

export const metronomeInitialState = {
    name: 'Node 10.2',
    blocks: [
        {
            name: 'Intro',
            duration: 2 * 60
        },
        {
            name: 'CLI Args',
            duration: 7 * 60
        },
        {
            name: 'File Write',
            duration: 15 * 60
        },
        {
            name: 'Docs/Stack Overflow',
            duration: 7 * 60
        },
        {
            name: 'File Read',
            duration: 10 * 60
        },
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
    },
    'View.Timer.stop': (state) => {
        return state
            .set('active', false)
            .set('present', 0)
    }
}, new iMap({
    present: 0,
    active: false,
    speechActive: false
}))