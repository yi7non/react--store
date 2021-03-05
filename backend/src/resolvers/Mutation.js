const Mutaitions = {
  createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    return ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    )
  },
  updateItem(parent, args, { db }, info) {
    // 1. take a copy of the update
    const updates = { ...args }
    // 2. remove the ID from the updates
    delete updates.id
    // 3. run the update method
    return db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    )
  }
}

module.exports = Mutaitions
