interface MButtonProps {
    onClick: () => void;
    marked?: boolean; 
    title: string;
    icon: string;
    hover?: boolean; 
  }

  export function MButton({
    onClick,
    marked = false, 
    title,
    icon,
    hover = false, 
  }: MButtonProps) {
    return (
      <button
        onClick={onClick}
        title={title}
        className={`px-2 py-1 rounded border-black border-[3px] shadow-[1px_1px] active:scale-95 transition
          ${marked ? "bg-gray-200" : "bg-white"} 
          ${hover && !marked ? "hover:bg-gray-100" : ""}`}
      >
        <img src={icon} alt={title} style={{ width: '20px', height: '20px' }} />
      </button>
    );
  }
  