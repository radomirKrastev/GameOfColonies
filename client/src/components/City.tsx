import { useGameContext } from "./Game";

function City() {
    const { possibleCityTargets, possibleSettlementTargets } = useGameContext();

    const chooseCity = () => {
      possibleSettlementTargets.forEach((x) => x.setVisible(false));
      possibleCityTargets.forEach((x) => x.setVisible(true));
  };

    return (
        <button className="button" onClick={chooseCity}>
            Choose City
        </button>
    );
}

export default City;

