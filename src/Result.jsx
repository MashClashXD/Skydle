import React from "react";
import Card from "./Card";

const tierValues = {
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  EPIC: 4,
  MYTHIC: 6,
  LEGENDARY: 5,
  VERY_SPECIAL: 8,
  SPECIAL: 7,
  UNOBTAINABLE: 9,
};

function compareTier(guessedTier, answerTier) {
  const guessedValue = tierValues[guessedTier];
  const answerValue = tierValues[answerTier];
  if (guessedValue > answerValue) {
    return "↓";
  } else if (guessedValue < answerValue) {
    return "↑";
  } else {
    return "";
  }
}

function formatPrice(price) {
  // Convert and format price based on its size
  if (price >= 1e9) {
    return "$" + Math.round(price / 1e9) + "b"; // Billions
  } else if (price >= 1e6) {
    return "$" + Math.round(price / 1e6) + "m"; // Millions
  } else if (price >= 1e3) {
    return "$" + Math.round(price / 1e3) + "k"; // Thousands
  } else {
    return "$" + price.toString(); // Prices less than 1000
  }
}

const imageDictionary = {
  CARPET: "171-0.png",
  LEATHER_HELMET: "298-0.png",
  LEATHER_BOOTS: "301-0.png",
  DIAMOND_HOE: "293-0.png",
  PRISMARINE_CRYSTALS: "410-0.png",
  COBBLESTONE: "4-0.png",
  GOLD_HOE: "294-0.png",
  ARROW: "262-0.png",
  LEATHER_CHESTPLATE: "299-0.png",
  CHAINMAIL_CHESTPLATE: "303-0.png",
  STORAGE_MINECART: "342-0.png",
  IRON_INGOT: "265-0.png",
  DIAMOND_CHESTPLATE: "311-0.png",
  WOOD_SWORD: "268-0.png",
  GOLD_CHESTPLATE: "315-0.png",
  DROPPER: "158-0.png",
  LOG: "17-0.png",
  DIAMOND_BOOTS: "313-0.png",
  GOLD_BOOTS: "317-0.png",
  REDSTONE_TORCH_ON: "76-0.png",
  SPONGE: "19-0.png",
  HOPPER: "154-0.png",
  IRON_BOOTS: "309-0.png",
  EMERALD: "388-0.png",
  IRON_AXE: "258-0.png",
  SADDLE: "329-0.png",
  COOKED_FISH: "350-0.png",
  GOLD_PICKAXE: "285-0.png",
  MINECART: "328-0.png",
  GOLD_INGOT: "266-0.png",
  CHAINMAIL_BOOTS: "305-0.png",
  RED_MUSHROOM: "40-0.png",
  WOOD: "5-0.png",
  STRING: "287-0.png",
  IRON_PICKAXE: "257-0.png",
  EXPLOSIVE_MINECART: "407-0.png",
  ARMOR_STAND: "416-0.png",
  LEAVES: "18-0.png",
  HOPPER_MINECART: "408-0.png",
  BOW: "261-0.png",
  FISHING_ROD: "346-0.png",
  DIAMOND: "264-0.png",
  DIAMOND_PICKAXE: "278-0.png",
  WOOD_SPADE: "269-0.png",
  DIAMOND_SWORD: "276-0.png",
  GOLD_SPADE: "284-0.png",
  RED_ROSE: "38-0.png",
  WOOD_HOE: "290-0.png",
  GOLD_SWORD: "283-0.png",
  FIREWORK: "401-0.png",
  IRON_CHESTPLATE: "307-0.png",
  EMPTY_MAP: "395-0.png",
  IRON_HELMET: "306-0.png",
  PACKED_ICE: "174-0.png",
  IRON_SWORD: "267-0.png",
  MOSSY_COBBLESTONE: "48-0.png",
  PRISMARINE_SHARD: "409-0.png",
  WOOD_AXE: "271-0.png",
  FENCE: "85-0.png",
  CHAINMAIL_HELMET: "302-0.png",
  WHEAT: "296-0.png",
  FEATHER: "288-0.png",
  DIAMOND_LEGGINGS: "312-0.png",
  IRON_SPADE: "256-0.png",
  SHEARS: "359-0.png",
  WOOL: "35-0.png",
  COAL_BLOCK: "173-0.png",
  STONE_SWORD: "272-0.png",
  SEA_LANTERN: "169-0.png",
  WOOD_PICKAXE: "270-0.png",
  IRON_LEGGINGS: "308-0.png",
  SKULL_ITEM: "397-0.png",
  GOLD_HELMET: "314-0.png",
  INK_SACK: "351-0.png",
  BOOK: "340-0.png",
  STAINED_GLASS: "95-0.png",
  COOKIE: "357-0.png",
  NETHER_STAR: "399-0.png",
  MELON_BLOCK: "103-0.png",
  YELLOW_FLOWER: "37-0.png",
  IRON_BARDING: "417-0.png",
  WATER_LILY: "111-0.png",
  LEATHER_LEGGINGS: "300-0.png",
  BONE: "352-0.png",
  GOLD_BARDING: "418-0.png",
  CHAINMAIL_LEGGINGS: "304-0.png",
  IRON_HOE: "292-0.png",
  STICK: "280-0.png",
  GHAST_TEAR: "370-0.png",
  COOKED_MUTTON: "424-0.png",
  HAY_BLOCK: "170-0.png",
  DISPENSER: "23-0.png",
  GOLD_AXE: "286-0.png",
  COMPASS: "345-0.png",
  MUTTON: "423-0.png",
  POWERED_MINECART: "343-0.png",
  BLAZE_ROD: "369-0.png",
  DOUBLE_PLANT: "175-0.png",
  STONE_PICKAXE: "274-0.png",
  ENCHANTED_BOOK: "403-0.png",
  STAINED_CLAY: "159-0.png",
  GOLD_LEGGINGS: "316-0.png",
  DIAMOND_SPADE: "277-0.png",
  DIAMOND_AXE: "279-0.png",
  RAW_FISH: "349-0.png",
  STONE_HOE: "291-0.png",
  DIAMOND_HELMET: "310-0.png",
  GOLD_BLOCK: "41-0.png",
};

const skinToUrl = (skin) => {
  const skinUrl = JSON.parse(atob(skin.replace("\u003d", "="))).textures.SKIN
    .url;
  const skinHash = skinUrl.substring(skinUrl.lastIndexOf("/") + 1);
  return `https://mc-heads.net/head/${skinHash}`;
};

const Result = ({ result, answerItem }) => {
  return (
    <article
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <section
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          style={{ width: "100px", height: "100px", marginRight: "10px" }}
          src={
            result.material === "SKULL_ITEM"
              ? skinToUrl(result.skin)
              : `/Skydle/items/${
                  imageDictionary[result.material.toUpperCase()]
                }`
          }
          alt={result.name}
        />
        <p style={{ fontSize: "35px", fontWeight: "bold" }}>{result.name}</p>
      </section>
      <Card
        correct={answerItem.category === result.category}
        title="Category"
        value={result.category}
      />
      <Card
        correct={answerItem.material === result.material}
        title="Material"
        value={result.material}
      />
      <Card
        correct={answerItem.tier === result.tier}
        close={
          Math.abs(tierValues[answerItem.tier] - tierValues[result.tier]) === 1
        }
        title="Rarity"
        value={`${result.tier} ${compareTier(result.tier, answerItem.tier)}`}
      />
      <Card
        correct={answerItem.price === result.price}
        close={
          Math.abs(answerItem.price - result.price) /
            Math.max(answerItem.price, result.price) <
          0.25
        }
        title="Price"
        value={`${formatPrice(result.price)} ${
          result.price > answerItem.price
            ? "↓"
            : result.price < answerItem.price
            ? "↑"
            : ""
        }`}
      />
    </article>
  );
};

export default Result;
