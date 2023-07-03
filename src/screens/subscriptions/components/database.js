module.exports = {
  categories: ["Streaming", "Music", "Gaming", "Food", "Other"],
  streaming: [
    { title: "Select Service" },
    {
      title: "Netflix",
      tiers: [
        { tier: "Basic", price: 9.99 },
        { tier: "Standard", price: 15.49 },
        { tier: "Premium", price: 19.99 },
      ],
      color: "red",
    },
    {
      title: "Disney Plus",
      tiers: [
        { tier: "Monthly", price: 7.99 },
        { tier: "Yearly", price: 79.99 },
      ],
      color: "blue",
    },
    {
      title: "Hulu",
      tiers: [
        { tier: "Ads", price: 6.99 },
        { tier: "No Ads", price: 12.99 },
        { tier: "Hulu, Disney, & ESPN Bundle", price: 9.99 },
        { tier: "Basic", price: 9.99 },
      ],
      color: "green",
    },
    {
      title: "Amazon Prime",
      tiers: [{ tier: "Basic", price: 9.99 }],
      color: "blue",
    },
    {
      title: "Other",

      color: "black",
    },
  ],
  gaming: [
    { title: "Select Service" },
    {
      title: "Microsoft Ultimate",
      tiers: [
        { tier: "PC", price: 9.99 },
        { tier: "Console", price: 9.99 },
        { tier: "Ultimate", price: 14.99 },
      ],
      color: "red",
    },
    {
      title: "Playstation Plus",
      tiers: [
        { tier: "1 Month", price: 9.99 },
        { tier: "3 Months", price: 24.99 },
        { tier: "12 Months", price: 59.99 },
      ],
      color: "blue",
    },
    {
      title: "Stadia",
      tiers: [{ tier: "Standard", price: 9.99 }],
      color: "green",
    },
  ],
  music: [
    { title: "Select Service" },
    {
      title: "Apple Music",
      tiers: [
        { tier: "Student", price: 4.99 },
        { tier: "Standard", price: 9.99 },
        { tier: "Family", price: 14.99 },
      ],
      color: "red",
    },
    {
      title: "Spotify",
      tiers: [
        { tier: "Individual", price: 9.99 },
        { tier: "Duo", price: 12.99 },
        { tier: "Family", price: 15.99 },
        { tier: "Student", price: 4.99 },
      ],
      color: "green",
    },
    {
      title: "Pandora",
      tiers: [
        { tier: "Pandora Plus", price: 4.99 },
        { tier: "Pandora Premium", price: 9.99 },
      ],
      color: "blue",
    },
    {
      title: "Sirius XM",
      tiers: [
        { tier: "Music Showcase", price: 12.99 },
        { tier: "Music and Ent..", price: 15.99 },
        { tier: "Platinum", price: 4.99 },
      ],
      color: "blue",
    },
  ],
  food: [
    { title: "Select Service" },
    {
      title: "Uber Eats",
      tiers: [{ tier: "Eats Pass", price: 9.99 }],
      color: "red",
    },
    {
      title: "Door Dash",
      tiers: [{ tier: "DashPass", price: 9.99 }],
      color: "blue",
    },
    {
      title: "GrubHub",
      tiers: [{ tier: "Standard", price: 9.99 }],
      color: "green",
    },
  ],
};
