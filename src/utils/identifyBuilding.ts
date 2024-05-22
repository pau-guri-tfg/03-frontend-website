import Buildings from '../data/buildings.json';

export default function identifyBuilding(buildingId: string) {
  const buildings = Buildings as { [key: string]: GameBuilding };
  if (buildings[buildingId] === undefined) return null;
  return buildings[buildingId];
}