import { useGameContext } from "./Game";

function City() {
  const { possibleCityTargets, possibleSettlementTargets, possibleRoadTargets } = useGameContext();

  const chooseCity = () => {
      possibleSettlementTargets.forEach((x) => x.setVisible(false));
      possibleCityTargets.forEach((x) => x.setVisible(true));
      possibleRoadTargets.forEach((x) => x.setVisible(false));
  };

  return (
    <button className="button" onClick={chooseCity}>
      Choose City
    </button>
  );
}

export default City;

