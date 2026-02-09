import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { toggleCollection } from "@/features/products/filtersSlice";
import bestSellers from "@/assets/images/bestsellers.jpeg";
import newReleases from "@/assets/images/new release.jpeg";
import expertPicks from "@/assets/images/expert.jpeg";
import type { CollectionFlags } from "@/types";

function Category({
  image,
  title,
  collectionKey,
}: {
  image: string;
  title: string;
  collectionKey: keyof CollectionFlags;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-secondary-50 p-4 transition-shadow hover:shadow-card"
      onClick={() => {
        dispatch(toggleCollection(collectionKey));
        navigate("/products");
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="mb-2 h-48 w-full rounded object-cover 2xl:h-64"
      />
      <h3 className="text-center text-lg font-semibold">{title}</h3>
    </div>
  );
}

export function CollectionSection() {
  return (
    <>
      <h2 className="mt-8 text-center text-2xl font-bold text-primary md:text-3xl">
        Books collections curated for you
      </h2>
      <div className="mx-4 mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:mx-8">
        <Category
          image={bestSellers}
          title="Bestsellers"
          collectionKey="BEST_SELLERS"
        />
        <Category
          image={newReleases}
          title="New Releases"
          collectionKey="NEW_RELEASES"
        />
        <Category
          image={expertPicks}
          title="Expert Picks"
          collectionKey="EXPERT_PICKS"
        />
      </div>
    </>
  );
}
