const db = require('../config/connection');
const { User, Entry } = require('../models');
const userSeeds = require('./userSeeds.json');
const entrySeeds = require('./entrySeeds.json');

db.once('open', async () => {
  try {
    await Entry.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < entrySeeds.length; i++) {
      const { _id, entryAuthor } = await Entry.create(entrySeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: entryAuthor },
        {
          $addToSet: {
            entries: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
