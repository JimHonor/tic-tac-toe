export default function Player({ players, activePlayerIndex }) {
  return (
    <div style={{ width: "6rem" }}>
      {players.map((player, index) => (
        <div
          key={player.name}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{player.name}</span>
          <span>{player.score}</span>
          <span style={{ width: "2rem" }}>
            {activePlayerIndex === index ? "turn" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}
