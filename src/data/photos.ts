/** Real photographs hosted on Unsplash (free licence). The local crops in /public/images act as an offline fallback. */
export const unsplash = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTO = {
  // food
  baconPizza: "photo-1604382354936-07c5d9983bd3",
  duoPizza: "photo-1593560708920-61dd98c46a4e",
  familyFeast: "photo-1606728035253-49e8a23146de",
  dumplings: "photo-1638502338747-f7f368214cce",
  blackBurger: "photo-1607013251379-e6eecfffe234",
  roundPizza: "photo-1574071318508-1cdbab80d002",
  pepperoniPizza: "photo-1534308983496-4fabb1a015ee",
  chickenBalls: "photo-1562967914-608f82629710",
  hamPizza: "photo-1628840042765-356cda07504e",
  boardPizza: "photo-1613564834361-9436948817d1",
  italianoPizza: "photo-1544982503-9f984c14501a",
  burger: "photo-1568901346375-23c9450c58cd",
  mushroomPizza: "photo-1565299624946-b28f40a0ae38",
  salmonBagel: "photo-1707079408137-cc73e9ef71c2",
  fries: "photo-1630384060421-cb20d0e0649d",
  friesKetchup: "photo-1518013431117-eb1465fa5752",
  roastChicken: "photo-1574672280600-4accfa5b6f98",
  doubleBurger: "photo-1572802419224-296b0aeee0d9",
  burgerTray: "photo-1763689389824-dd2cea2e5772",
  woodPizza: "photo-1513104890138-7c749659a591",
  // people
  chef1: "photo-1701878198293-d1f3641efdb3",
  chef2: "photo-1659354219145-dedd2324698e",
  chef3: "photo-1759521296013-559479e2a891",
  chef4: "photo-1697898109582-40f15c65f174",
  chef5: "photo-1709837167686-a2e33aad1bf0",
  chef6: "photo-1689588532679-4bb5fdd8f6d5",
  chef7: "photo-1731576089290-e6230a18dcb4",
  chef8: "photo-1643834776503-891726ed42c6",
  customerMan: "photo-1568602471122-7832951cc4c5",
  customerWoman: "photo-1489278353717-f64c6ee8a4d2",
  eatingPizza: "photo-1648214583740-98cb08831380",
} as const;
