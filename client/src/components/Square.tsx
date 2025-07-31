type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  size: "small" | "large";
};

const Square: React.FC<SquareProps> = ({ value, onSquareClick, size }) => {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
          value === null
            ? "white"
            : value?.toLowerCase() === "o"
            ? "green"
            : "red",
        /*  border: "1px solid #999",
        outline: 0,
        borderRadius: 0, */

        fontSize: size === "large" ? "8rem" : "0.5rem",
        fontWeight: "bold",
        color: "white",
        border: "1px solid #ddd",
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
