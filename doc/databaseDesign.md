users
{
  username
  passwd(hashed)
  firstname
  lastname
  phone
  address
  email address
  isDeleted
  isAdmin
}

item
{
  itemID
  ownerID
  itemDescription
  startPrice
  addTimeStamp
  Image
  endBidTime
  status
  isDeleted
}

bid
{
  userName
  itemID
  bidTimeStamp
  bitPrice
  isDeleted
}

purchaseHistory
{
  buyerUserName
  salerUserName
  itemID
  status(open,canceled,shipped,ended)
  purchaseTimeStamp
}
