exports.home = (req, res) => {
    if (res.statusCode === 200) {
        res.render('../view/customers_view');
    }
    else {
        res.send('Error!');
    }
  }