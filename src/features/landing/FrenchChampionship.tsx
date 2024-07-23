import { frenchChampionshipAction } from "../../../app/getFrenchChampionship";
const FrenchChampionship = async () => {
  let remaining = 100;

  const data = await frenchChampionshipAction(remaining);

  if (data.remaining) {
    remaining = Number(data.remaining);
  }
  return (
    <>
      <h2>French championship</h2>
      <p>Remaining attempts : {remaining}</p>
    </>
  );
};

export default FrenchChampionship;
