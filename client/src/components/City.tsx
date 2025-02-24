import { useAppContext } from "./App";

function City() {
    const { possibleCityTargets, possibleSettlementTargets } = useAppContext();

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

