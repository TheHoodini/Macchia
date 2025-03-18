interface MButtonProps {
  onClick: () => void;
  marked?: boolean;
  title: string;
  icon: string;
  text?: string; 
  iconDimensions?: { width: string; height: string }; 
  color?: string;
  markedColor?: string;
  hoverColor?: string;
  shadow?: boolean;
}

export function MButton({
  onClick,
  marked = false,
  title,
  icon,
  text,
  iconDimensions = { width: "20px", height: "20px" }, 
  color = "white",
  markedColor = "#e5e7eb", 
  hoverColor = "#f3f4f6", 
  shadow = false,
}: MButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded border-black border-[3px] active:scale-95 transition flex items-center gap-3 
        ${shadow ? "shadow-[1px_1px]" : ""}`}
      style={{
        backgroundColor: marked ? markedColor : color,
      }}
      onMouseEnter={(e) => {
        if (!marked) e.currentTarget.style.backgroundColor = hoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = marked ? markedColor : color;
      }}
    >
      <img
        src={icon}
        alt={title}
        style={{ width: iconDimensions.width, height: iconDimensions.height }}
      />
      {text && <span>{text}</span>}
    </button>
  );
}
