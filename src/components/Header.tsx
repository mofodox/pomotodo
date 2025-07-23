interface HeaderProps {
  onSettingsClick: () => void;
}

export default function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="header">
      <h1>🍅 PomoTodo</h1>
      <button 
        className="settings-btn"
        onClick={onSettingsClick}
      >
        ⚙️
      </button>
    </header>
  );
}