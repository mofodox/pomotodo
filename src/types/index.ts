export type SessionType = 'pomodoro' | 'shortBreak' | 'longBreak'

export interface TimerSettings {
  pomodoro: number
  shortBreak: number
  longBreak: number
}