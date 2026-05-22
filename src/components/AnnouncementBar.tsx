export default function AnnouncementBar() {
  const items = [
    "✦ 100% Handmade",
    "✦ Aurora Chrome Nails",
    "✦ Reusable Press-On Sets",
    "✦ Sizes XS · S · M",
    "✦ 100% Handmade",
    "✦ Aurora Chrome Nails",
    "✦ Reusable Press-On Sets",
    "✦ Sizes XS · S · M",
  ];
  return (
    <div className="announce">
      <div className="announce-track">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="announce-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
