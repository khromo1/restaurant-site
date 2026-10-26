const dishes = [
    { id: 1, name: "Тартар из говядины с каперсами",
      description: "Рубленая говяжья вырезка с каперсами, горчицей и желтком.",
      filling: ["meat"],      taste: ["salty"],          hunger: ["none", "hungry"],
      mood: ["great", "good", "ok"] },
 
    { id: 2, name: "Улитки в чесночном соусе",
      description: "Классическая французская закуска с чесночным маслом и зеленью.",
      filling: ["snails"],    taste: ["salty", "soft"],  hunger: ["none", "hungry"],
      mood: ["great", "good"] },
 
    { id: 3, name: "Утиная грудка с апельсиновым соусом",
      description: "Утиная грудка с хрустящей кожей и кисло-сладким апельсиновым соусом.",
      filling: ["meat"],      taste: ["tangy", "sweet"], hunger: ["none", "hungry"],
      mood: ["great", "good", "ok"] },
 
    { id: 4, name: "Ризотто с белыми грибами",
      description: "Кремовое ризотто с белыми грибами и пармезаном.",
      filling: ["mushrooms"], taste: ["soft", "salty"],  hunger: ["none", "hungry"],
      mood: ["ok", "meh", "bad"] },
 
    { id: 5, name: "Крем-брюле с ванилью",
      description: "Нежный ванильный крем с карамельной корочкой.",
      filling: ["dessert"],   taste: ["sweet", "soft"],  hunger: ["none", "hungry"],
      mood: ["great", "good", "ok", "meh", "bad"] },
 
    { id: 6, name: "Сет «Импрессион»",
      description: "Тартар, утиная грудка и тарт Татен.",
      filling: ["meat", "dessert"],      taste: ["salty", "tangy", "sweet"], hunger: ["very"],
      mood: ["great", "good", "ok"] },
 
    { id: 7, name: "Сет «Живопись»",
      description: "Суп, ризотто и крем-брюле.",
      filling: ["mushrooms", "dessert"], taste: ["soft", "salty", "sweet"],  hunger: ["very"],
      mood: ["ok", "meh", "bad", "good", "great"] }
];