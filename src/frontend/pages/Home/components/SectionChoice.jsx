import { useData } from "../../../contexts/data-context";
import { Card } from "../../../index";

export function SectionChoice() {
  const { data } = useData();
  return (
    <>
      <h2 className="color-text-primary text-3xl text-center">
        Plan it's Choice
      </h2>
      <div className="card-wrapper">
        {data.slice(0, 5)?.map((item) => (
          <div key={item._id}>
            <Card item={item} />
          </div>
        ))}
      </div>
    </>
  );
}
