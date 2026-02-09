import { useAppDispatch } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { toggleCategory } from "@/features/products/filtersSlice";
import contemporaryFiction from "@/assets/images/book cluster.jpeg";
import selfHelp from "@/assets/images/self help.jpeg";
import biographies from "@/assets/images/bio.jpeg";
import spirituality from "@/assets/images/spiritual.jpeg";
import mythology from "@/assets/images/history.jpeg";
import type { CategoryFlags } from "@/types";

function Genre({
  image,
  title,
  categoryKey,
}: {
  image: string;
  title: string;
  categoryKey: keyof CategoryFlags;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-secondary-50 p-4 transition-shadow hover:shadow-card"
      onClick={() => {
        dispatch(toggleCategory(categoryKey));
        navigate("/products");
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="mb-2 h-40 w-full rounded object-cover 2xl:h-52"
      />
      <h3 className="text-center font-semibold">{title}</h3>
    </div>
  );
}

export function GenreSection() {
  return (
    <>
      <h2 className="mt-12 text-center text-2xl font-bold text-primary md:text-3xl">
        Books in your favourite genre
      </h2>
      <div className="mx-4 mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 lg:mx-8">
        <Genre
          image={contemporaryFiction}
          title="Contemporary Fiction"
          categoryKey="CONTEMPORARY_FICTION"
        />
        <Genre image={selfHelp} title="Self Help" categoryKey="SELF_HELP" />
        <Genre
          image={biographies}
          title="Biographies & Autobiographies"
          categoryKey="BIOGRAPHIES_AUTOBIOGRAPHIES"
        />
        <Genre
          image={spirituality}
          title="Spirituality"
          categoryKey="SPIRITUALITY"
        />
        <Genre image={mythology} title="Mythology" categoryKey="MYTHOLOGY" />
      </div>
    </>
  );
}
