const Mutaitions = {
    createItem(parent, args, ctx, info) {
     // TODO: Check if they are logged in
    
     return ctx.db.mutation.createItem({
         data: {
             ...args
         }
     }, info)
    }
}

module.exports = Mutaitions