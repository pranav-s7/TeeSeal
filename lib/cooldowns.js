const {
  Cooldown
} = require("./models.js");

async function cooldownHelper(id, type, length) {
  const cooldownSet =
    (await Cooldown.findOne({
      userID: id,
      action: type,
      expires: {
        $gt: Date.now()
      }
    })) === null;

  if (cooldownSet) {
    await Cooldown.remove({
      userID: id,
      action: type,
      expires: {
        $gt: Date.now()
      }
    });

    await Cooldown.create({
      userID: id,
      action: type,
      expires: Date.now() + length
    });

    return true;
  } else {
    return false;
  }
}

module.exports = cooldownHelper;