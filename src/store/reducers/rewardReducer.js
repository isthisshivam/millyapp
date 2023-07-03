const initialState = {
  currentPoints: 312,
  totalPoints: 3156,
  achievements: [
    {
      name: "First Timer",
      points: 50,
      info: "Play the game for the first time",
      progress: 1,
    },
    {
      name: "Budgeter Apprentice",
      points: 50,
      info: "Complete 10 games",
      progress: 0.8,
    },
    {
      name: "Master Of Finance",
      points: 50,
      info: "Average 75% in 10 games",
      progress: 0.7,
    },
    { name: "Finance Grand Master", points: 50, progress: 0.3 },
    { name: "Budget Guru", points: 50, progress: 0 },
  ],
};
export const RewardsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
