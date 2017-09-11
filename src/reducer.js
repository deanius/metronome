import { createReducer, iMap } from 'antares-protocol'

export const metronomeInitialState = {
  name: 'Node 10.2',
  blocks: [
    {
      name: 'Uni: Introductions',
      duration: 39 * 60
    },
    {
      name: 'Ins: PPT + Intros',
      duration: 15 * 60,
      priority: 'critical'
    },
    {
      name: 'Ins: The Path of Learning',
      duration: 15 * 60,
      priority: 'critical'
    },
    {
      name: 'Ins: Course Structure',
      duration: 5 * 60,
      priority: 'high'
    },
    {
      name: 'Ins: Pre-Work',
      duration: 5 * 60
    },
    {
      name: 'Ins: Confirm Pre-Work Installed',
      duration: 30 * 60,
      priority: 'critical'
    },
    {
      name: 'Ins: PPT On The Modern Web',
      duration: 10 * 60
    },
    {
      name: 'Ins: Console/Terminal',
      duration: 10 * 60
    },
    {
      name: 'Stu: Console Commands',
      duration: 12 * 60,
      priority: 'high'
    },
    {
      name: 'Stu: Discuss with Neighbors',
      duration: 5 * 60
    },
    {
      name: 'Ins: Hello HTML',
      duration: 5 * 60
    },
    {
      name: 'Stu: Intro to HTML',
      duration: 5 * 60,
      priority: 'high'
    },
    {
      name: 'Ins: Review',
      duration: 10 * 60
    },
    {
      name: 'LUUNCH',
      duration: 30 * 60
    },
    {
      name: 'Ins: Welcome Back',
      duration: 1 * 60
    },
    {
      name: 'Ins: PPT What/Why Git',
      duration: 15 * 60,
      priority: 'high'
    },
    {
      name: 'Stu: Discuss Git',
      duration: 3 * 60,
      priority: 'critical'
    },
    {
      name: 'Ins: Recap',
      duration: 3 * 60
    },
    {
      name: 'Ins: PPT Github',
      duration: 5 * 60
    },

    {
      name: 'Ins: Demo Git',
      duration: 15 * 60,
      priority: 'critical'
    },
    {
      name: 'Ins: Slack Github Guide ppts',
      duration: 2 * 60,
      priority: 'critical'
    },
    {
      name: 'Stu: Add Commit Push',
      duration: 20 * 60,
      priority: 'critical'
    },

    {
      name: 'Ins: Introduce Supplemental Videos',
      duration: 5 * 60
    },
    {
      name: 'Ins: Demo Homework 1',
      duration: 5 * 60
    }
  ]
}
export const metronomeReducer = createReducer({}, metronomeInitialState)

export const viewReducer = createReducer(
  {
    'View.Speech.start': state => state.set('speechActive', true),
    'View.Speech.stop': state => state.set('speechActive', false),
    'View.Timer.tick': state => {
      return state.update('present', p => p + 1).set('active', true)
    },
    'View.Timer.stop': state => {
      return state.set('active', false).set('present', 0)
    }
  },
  new iMap({
    present: 0,
    active: false,
    speechActive: false
  })
)
