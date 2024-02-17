export default function POP({ pop }) {
  const popList = pop.map((popitem) => {
    return [popitem.startTime.slice(11, 13), popitem.elementValue[0].value];
  });
  return (
    <div className="popList">
      <ul>
        {popList.map((popItem, index) => (
          <li key={index}>
            <p>{popItem[0]}時</p>
            <p>{popItem[1]}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
