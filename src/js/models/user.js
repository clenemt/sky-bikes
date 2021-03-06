const FIRSTS = [
  'Mae',
  'Floyd',
  'Kevin',
  'Russell',
  'Henrietta',
  'Earl',
  'Polly',
  'Elizabeth',
  'Nora',
  'Fanny',
];
const LASTS = [
  'Chavez',
  'Roy',
  'Walsh',
  'Blake',
  'Kelley',
  'Lawrence',
  'Tucker',
  'Park',
  'Mack',
  'Frank',
];
const PROVIDERS = [
  'gmail.com',
  'hotmail.com',
  'gdpr.com',
  'orange.fr',
  'live.com',
  'free.fr',
];

// Helper to pick a random item from the passed items.
const chance = (items) => items[Math.floor(Math.random() * items.length)];

/**
 * Generate an array of users.
 * @param  {Number} number - The amount of users to generate.
 * @return {Object[]} Returns the generated users.
 */
const generate = (number) => {
  const users = [...Array(number)].map(() => {
    const firstname = chance(FIRSTS);
    const lastname = chance(LASTS);
    const provider = chance(PROVIDERS);
    return {
      firstname,
      lastname,
      email: `${firstname}.${lastname}@${provider}`.toLowerCase(),
      phone: `+33 ${Math.random()
        .toString()
        .slice(2, 10)}`,
    };
  });

  return [
    ...users,
    {
      firstname: 'root',
      lastname: 'admin',
      email: 'root@gmail.com',
      admin: true,
      phone: '0000000',
    },
  ];
};

export { generate };
