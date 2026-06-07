import type { DenominationId, GameDefinition, MoneyDenomination, RegionCode } from "../types";

export const denominations: Record<DenominationId, MoneyDenomination> = {
  "uk-1p": { id: "uk-1p", label: "1 penny", shortLabel: "1p", valueMinor: 1, symbol: "1p", color: "#b96a43", region: "uk", group: "bronze" },
  "uk-2p": { id: "uk-2p", label: "2 pence", shortLabel: "2p", valueMinor: 2, symbol: "2p", color: "#c96f45", region: "uk", group: "bronze" },
  "uk-5p": { id: "uk-5p", label: "5 pence", shortLabel: "5p", valueMinor: 5, symbol: "5p", color: "#c9d0d5", region: "uk", group: "silver" },
  "uk-10p": { id: "uk-10p", label: "10 pence", shortLabel: "10p", valueMinor: 10, symbol: "10p", color: "#b9c4cb", region: "uk", group: "silver" },
  "uk-20p": { id: "uk-20p", label: "20 pence", shortLabel: "20p", valueMinor: 20, symbol: "20p", color: "#a9b7c0", region: "uk", group: "silver" },
  "uk-50p": { id: "uk-50p", label: "50 pence", shortLabel: "50p", valueMinor: 50, symbol: "50p", color: "#9eaab3", region: "uk", group: "silver" },
  "uk-1-pound": { id: "uk-1-pound", label: "1 pound", shortLabel: "£1", valueMinor: 100, symbol: "£1", color: "#d6ad47", region: "uk", group: "pound" },
  "uk-2-pound": { id: "uk-2-pound", label: "2 pounds", shortLabel: "£2", valueMinor: 200, symbol: "£2", color: "#c7b27d", region: "uk", group: "pound" },
  "us-penny": { id: "us-penny", label: "Penny", shortLabel: "1c", valueMinor: 1, symbol: "1c", color: "#d46d3d", region: "us", group: "bronze" },
  "us-nickel": { id: "us-nickel", label: "Nickel", shortLabel: "5c", valueMinor: 5, symbol: "5c", color: "#a9b0b7", region: "us", group: "silver" },
  "us-dime": { id: "us-dime", label: "Dime", shortLabel: "10c", valueMinor: 10, symbol: "10c", color: "#c7d0d8", region: "us", group: "silver" },
  "us-quarter": { id: "us-quarter", label: "Quarter", shortLabel: "25c", valueMinor: 25, symbol: "25c", color: "#8e9aa6", region: "us", group: "silver" }
};

export function getDenomination(id: DenominationId) {
  return denominations[id];
}

export function getDenominationsForRegion(region: RegionCode) {
  return Object.values(denominations).filter((coin) => coin.region === region);
}

const ukCore: DenominationId[] = ["uk-1p", "uk-2p", "uk-5p", "uk-10p", "uk-20p", "uk-50p", "uk-1-pound", "uk-2-pound"];
const ukSmall: DenominationId[] = ["uk-1p", "uk-2p", "uk-5p", "uk-10p"];
const usCore: DenominationId[] = ["us-penny", "us-nickel", "us-dime", "us-quarter"];

export function createMoneyGames(region: RegionCode): GameDefinition[] {
  const isUk = region === "uk";
  const core = isUk ? ukCore : usCore;
  const small = isUk ? ukSmall : usCore;
  const savingName = isUk ? "Saving Pot" : "Piggy Bank";
  const shopItems = isUk ? ["apple", "sticker", "crayon", "banana", "badge"] : ["apple", "sticker", "crayon", "banana"];

  return [
    {
      id: "coin-catcher",
      title: "Coin Catcher",
      shortTitle: "Catch",
      world: "money",
      region,
      mascot: "penny",
      goal: isUk ? "Hear the UK coin name, then tap the matching coin." : "Hear the coin name, then tap the matching coin.",
      color: "#e95d3f",
      levels: core.slice(0, isUk ? 6 : 4).map((id, index) => ({
        id: `cc-${region}-${index + 1}`,
        title: `Find ${denominations[id].shortLabel}`,
        narrator: `Tap ${denominations[id].label}.`,
        stars: index < 2 ? 2 : 3,
        targetDenomination: id,
        denominations: core.slice(0, Math.min(core.length, Math.max(3, index + 3)))
      }))
    },
    {
      id: "saving-pot",
      title: savingName,
      shortTitle: "Save",
      world: "money",
      region,
      mascot: "penny",
      goal: isUk ? "Drag every coin into the saving pot." : "Drag every coin into the bank.",
      color: "#f184a3",
      levels: [2, 3, 4, 5].map((count, index) => ({
        id: `sp-${region}-${index + 1}`,
        title: `Save ${count} coins`,
        narrator: isUk ? `Drag ${count} coins into the saving pot.` : `Drag ${count} coins into the bank.`,
        stars: index < 2 ? 2 : 3,
        targetCount: count,
        denominations: small.slice(0, Math.min(small.length, count))
      }))
    },
    {
      id: "count-match",
      title: "Count & Match",
      shortTitle: "Count",
      world: "money",
      region,
      mascot: "penny",
      goal: "Count the coins, then tap the matching number.",
      color: "#36a269",
      levels: [3, 4, 5, 6, 8, 10].map((count, index) => ({
        id: `cm-${region}-${index + 1}`,
        title: `Count to ${count}`,
        narrator: `Count the coins. Tap ${count}.`,
        stars: index < 3 ? 2 : 3,
        targetCount: count,
        denominations: small
      }))
    },
    {
      id: "tiny-shop",
      title: "Tiny Shop",
      shortTitle: "Shop",
      world: "money",
      region,
      mascot: "penny",
      goal: "Choose enough coins to buy a tiny shop item.",
      color: "#ff9f43",
      levels: [2, 3, 4, 5, 6].map((price, index) => ({
        id: `ts-${region}-${index + 1}`,
        title: `Buy ${shopItems[index]}`,
        narrator: isUk ? `${shopItems[index]} costs ${price} pence. Pick enough coins.` : `${shopItems[index]} costs ${price} cents. Pick enough coins.`,
        stars: index < 2 ? 2 : 3,
        shopItem: shopItems[index],
        priceMinor: price,
        denominations: small
      }))
    },
    {
      id: "more-or-less",
      title: "More or Less",
      shortTitle: "Compare",
      world: "money",
      region,
      mascot: "penny",
      goal: "Tap the pile with more money.",
      color: "#7bd389",
      levels: [
        { id: `ml-${region}-1`, title: "Which pile is more?", narrator: "Tap the pile with more money.", stars: 2, pileA: [small[0], small[0]], pileB: [small[1]] },
        { id: `ml-${region}-2`, title: "More coins", narrator: "Tap the pile with more coins.", stars: 2, pileA: [small[0], small[1]], pileB: [small[2]] },
        { id: `ml-${region}-3`, title: "Bigger pile", narrator: "Which side has more money?", stars: 3, pileA: [small[2]], pileB: [small[0], small[1], small[1]] },
        { id: `ml-${region}-4`, title: "Shop helper", narrator: "Find the bigger amount.", stars: 3, pileA: [small[3]], pileB: [small[1], small[2]] }
      ]
    },
    {
      id: "coin-sorter",
      title: "Coin Sorter",
      shortTitle: "Sort",
      world: "money",
      region,
      mascot: "penny",
      goal: isUk ? "Sort bronze, silver, and pound coins." : "Sort bronze and silver coins.",
      color: "#9b7bd3",
      levels: [
        { id: `cs-${region}-1`, title: "Bronze coins", narrator: "Tap the bronze coins.", stars: 2, targetDenomination: small[0], denominations: core, sortGroups: [{ id: "bronze", label: "Bronze", denominationIds: core.filter((id) => denominations[id].group === "bronze") }] },
        { id: `cs-${region}-2`, title: "Silver coins", narrator: "Tap the silver coins.", stars: 2, targetDenomination: small[2], denominations: core, sortGroups: [{ id: "silver", label: "Silver", denominationIds: core.filter((id) => denominations[id].group === "silver") }] },
        { id: `cs-${region}-3`, title: "Coin families", narrator: "Put each coin with its family.", stars: 3, denominations: core, sortGroups: [...new Set(core.map((id) => denominations[id].group))].map((group) => ({ id: group, label: group === "pound" ? "Pound" : group[0].toUpperCase() + group.slice(1), denominationIds: core.filter((id) => denominations[id].group === group) })) },
        { id: `cs-${region}-4`, title: "Quick sort", narrator: "Sort the coins by colour and shape.", stars: 3, denominations: core, sortGroups: [...new Set(core.map((id) => denominations[id].group))].map((group) => ({ id: group, label: group === "pound" ? "Pound" : group[0].toUpperCase() + group.slice(1), denominationIds: core.filter((id) => denominations[id].group === group) })) }
      ]
    },
    {
      id: "giving-jar",
      title: "Giving Jar",
      shortTitle: "Share",
      world: "money",
      region,
      mascot: "penny",
      goal: isUk ? "Choose coins for the charity jar." : "Choose coins to share with a friend.",
      color: "#5abf90",
      levels: [2, 3, 4, 5].map((count, index) => ({
        id: `gj-${region}-${index + 1}`,
        title: `Share ${count}`,
        narrator: isUk ? `Put ${count} coins in the charity jar.` : `Put ${count} coins in the sharing jar.`,
        stars: index < 2 ? 2 : 3,
        targetCount: count,
        denominations: small
      }))
    }
  ];
}
