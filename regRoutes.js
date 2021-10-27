
async function resetAll(req, res) {
    try {
      await greets.removeName()
      req.flash('error', 'Reseting everything on database')
      res.redirect('/')
    } catch (error) {
      
    }
}
