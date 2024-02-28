import { useNavigate } from "react-router-dom";

function ProjectCard(data) {
  const Project = data.data;
  // console.log("here is project ProjectCard",Project);
  const navigate = useNavigate();

  //for comma separated frameworks
  const frameworks = Project?.frameworks?.split(",");
  // console.log("here is frameworks ProjectCard",frameworks);
  return (
    <div
      onClick={() => navigate("/myprojects/details", { state: { ...Project } })}
      className="card bg-base-100 border-white-500 shadow-lg"
    >
      <figure className="px-10 pt-10">
        <img src={Project?.image} alt={Project?.title} className="rounded-lg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{Project?.title}</h2>
        <div className="card-actions">
          {frameworks?.map((item) => (
            <div key={item} className="badge badge-ghost badge-outline badge-accent">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
