import { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'

type SessionType = 'pomodoro' | 'shortBreak' | 'longBreak'

interface TimerSettings {
  pomodoro: number
  shortBreak: number
  longBreak: number
}

function App() {
  const [currentSession, setCurrentSession] = useState<SessionType>('pomodoro')
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<TimerSettings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  })

  const intervalRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio for notifications
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createBeepSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }

    audioRef.current = { play: createBeepSound } as any
  }, [])

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  // Handle session completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      // Play notification sound
      if (audioRef.current) {
        audioRef.current.play()
      }

      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(`${getSessionName(currentSession)} completed!`, {
          body: 'Time for the next session.',
          icon: '/vite.svg'
        })
      }

      // Update completed pomodoros count
      if (currentSession === 'pomodoro') {
        setCompletedPomodoros(prev => prev + 1)
      }

      // Auto-transition to next session
      setTimeout(() => {
        transitionToNextSession()
      }, 1000)
    }
  }, [timeLeft, isRunning, currentSession])

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const getSessionName = (session: SessionType): string => {
    switch (session) {
      case 'pomodoro': return 'Pomodoro'
      case 'shortBreak': return 'Short Break'
      case 'longBreak': return 'Long Break'
    }
  }

  const getSessionDuration = (session: SessionType): number => {
    switch (session) {
      case 'pomodoro': return settings.pomodoro * 60
      case 'shortBreak': return settings.shortBreak * 60
      case 'longBreak': return settings.longBreak * 60
    }
  }

  const transitionToNextSession = () => {
    setIsRunning(false)
    
    let nextSession: SessionType
    if (currentSession === 'pomodoro') {
      // After every 4 pomodoros, take a long break
      nextSession = (completedPomodoros + 1) % 4 === 0 ? 'longBreak' : 'shortBreak'
    } else {
      nextSession = 'pomodoro'
    }

    setCurrentSession(nextSession)
    setTimeLeft(getSessionDuration(nextSession))
  }

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(getSessionDuration(currentSession))
  }

  const switchSession = (session: SessionType) => {
    setIsRunning(false)
    setCurrentSession(session)
    setTimeLeft(getSessionDuration(session))
  }

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings)
    // Update current timer if not running
    if (!isRunning) {
      setTimeLeft(getSessionDuration(currentSession))
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = (): number => {
    const totalTime = getSessionDuration(currentSession)
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  return (
    <div className="app">
      <Header onSettingsClick={() => setShowSettings(!showSettings)} />

      <main className="main">
        <div className="session-tabs">
          <button 
            className={`tab ${currentSession === 'pomodoro' ? 'active' : ''}`}
            onClick={() => switchSession('pomodoro')}
          >
            Pomodoro
          </button>
          <button 
            className={`tab ${currentSession === 'shortBreak' ? 'active' : ''}`}
            onClick={() => switchSession('shortBreak')}
          >
            Short Break
          </button>
          <button 
            className={`tab ${currentSession === 'longBreak' ? 'active' : ''}`}
            onClick={() => switchSession('longBreak')}
          >
            Long Break
          </button>
        </div>

        <div className="timer-container">
          <div className="progress-ring">
            <svg className="progress-svg" viewBox="0 0 300 300">
              <circle
                className="progress-background"
                cx="150"
                cy="150"
                r="140"
                strokeWidth="8"
                fill="none"
              />
              <circle
                className="progress-bar"
                cx="150"
                cy="150"
                r="140"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 140}`}
                strokeDashoffset={`${2 * Math.PI * 140 * (1 - getProgress() / 100)}`}
              />
            </svg>
            <div className="timer-display">
              <div className="time">{formatTime(timeLeft)}</div>
              <div className="session-type">{getSessionName(currentSession)}</div>
            </div>
          </div>

          <div className="controls">
            {!isRunning ? (
              <button className="control-btn start" onClick={startTimer}>
                ▶️ Start
              </button>
            ) : (
              <button className="control-btn pause" onClick={pauseTimer}>
                ⏸️ Pause
              </button>
            )}
            <button className="control-btn reset" onClick={resetTimer}>
              🔄 Reset
            </button>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-number">{completedPomodoros}</span>
            <span className="stat-label">Completed Pomodoros Today</span>
          </div>
        </div>

        {showSettings && (
          <div className="settings-modal">
            <div className="settings-content">
              <h3>Timer Settings</h3>
              <div className="setting-group">
                <label>Pomodoro Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.pomodoro}
                  onChange={(e) => updateSettings({
                    ...settings,
                    pomodoro: parseInt(e.target.value) || 25
                  })}
                />
              </div>
              <div className="setting-group">
                <label>Short Break Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreak}
                  onChange={(e) => updateSettings({
                    ...settings,
                    shortBreak: parseInt(e.target.value) || 5
                  })}
                />
              </div>
              <div className="setting-group">
                <label>Long Break Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreak}
                  onChange={(e) => updateSettings({
                    ...settings,
                    longBreak: parseInt(e.target.value) || 15
                  })}
                />
              </div>
              <button 
                className="close-settings"
                onClick={() => setShowSettings(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
